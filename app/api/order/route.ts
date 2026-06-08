import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkoutSchema } from "@/lib/checkoutSchema";
import type { OrderEmailData, OrderItem } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// Rate limiting (best-effort, in-memory). Ограничава спам поръчки по IP.
// Бележка: на serverless паметта не е споделена между инстанси, затова това
// спира наивен спам, но не е разпределено. За пълна защита → външен store.
// ─────────────────────────────────────────────────────────────────────────────
const RATE_LIMIT = 5; // макс. заявки
const WINDOW_MS = 10 * 60 * 1000; // в рамките на 10 минути
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  try {
    // 1) Rate limiting по IP.
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { success: false, error: "Твърде много заявки. Опитайте отново по-късно." },
        { status: 429 },
      );
    }

    // Инстанцираме клиента тук (не на ниво модул), за да не гръмне build-ът
    // при събиране на page data, когато RESEND_API_KEY още не е наличен.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();

    // 2) Honeypot — скрито поле, което истинските потребители не виждат.
    // Ако е попълнено, заявката е от бот → отхвърляме без да пращаме имейл.
    if (typeof body?.company === "string" && body.company.trim() !== "") {
      return NextResponse.json(
        { success: false, error: "Невалидни данни" },
        { status: 400 },
      );
    }

    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Невалидни данни" },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Артикулите идват от клиента → нормализираме и валидираме типовете.
    // (XSS escape става при рендиране на имейла.)
    const rawItems = Array.isArray(body?.items) ? body.items : [];
    const items: OrderItem[] = rawItems
      .map((it: unknown) => {
        const o = (it ?? {}) as Record<string, unknown>;
        return {
          name: String(o.name ?? ""),
          size: String(o.size ?? ""),
          quantity: Number(o.quantity) || 0,
          price: Number(o.price) || 0,
        };
      })
      .filter((it: OrderItem) => it.name !== "" && it.quantity > 0);

    // Празна количка → няма какво да поръчаме.
    if (items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Количката е празна" },
        { status: 400 },
      );
    }

    const totalPrice =
      Number(body?.totalPrice) ||
      items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalItems =
      Number(body?.totalItems) ||
      items.reduce((sum, i) => sum + i.quantity, 0);

    const courierLabel = data.courier === "econt" ? "Еконт" : "Speedy";
    const deliveryLabel = data.deliveryType === "address" ? "До адрес" : "До офис";

    const deliveryDetails =
      data.deliveryType === "address"
        ? `${data.city}, ${data.street} ${data.streetNumber}`
        : data.officeId;

    const orderDate = new Date().toLocaleString("bg-BG", {
      timeZone: "Europe/Sofia",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Имейл до собственика
    await resend.emails.send({
      from: "Dana Vitan Boutique <orders@danavitan.com>",
      to: process.env.OWNER_EMAIL!,
      subject: `Нова поръчка — ${totalItems} артикул${totalItems === 1 ? "" : "а"}, ${totalPrice} €`,
      html: ownerEmailHtml({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        items,
        totalPrice,
        totalItems,
        courierLabel,
        deliveryLabel,
        deliveryDetails,
        orderDate,
      }),
    });

    // Имейл до клиента
    await resend.emails.send({
      from: "Dana Vitan Boutique <orders@danavitan.com>",
      to: data.email,
      subject: "Вашата поръчка е получена — Dana Vitan Boutique",
      html: clientEmailHtml({
        firstName: data.firstName,
        email: data.email,
        items,
        totalPrice,
        totalItems,
        courierLabel,
        deliveryLabel,
        deliveryDetails,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { success: false, error: "Грешка при изпращане" },
      { status: 500 },
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML шаблони — inline стилове (имейл клиентите не поддържат CSS класове)
// ─────────────────────────────────────────────────────────────────────────────

const BG_BODY = "#0a0a0a";
const BG_CARD = "#111111";
// Имейл клиентите не поддържат CSS променливи — стойността трябва да
// огледва --accent от globals.css при бъдеща промяна на бранд цвета.
const ACCENT = "#8B1A2F";
const TEXT = "#ffffff";
const LABEL = "#999999";

const wrapShell = (inner: string) => `
<!DOCTYPE html>
<html lang="bg">
  <head><meta charset="utf-8"><title>Dana Vitan Boutique</title></head>
  <body style="margin:0;padding:0;background:${BG_BODY};font-family:Arial,Helvetica,sans-serif;color:${TEXT};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG_BODY};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${BG_CARD};border-radius:6px;overflow:hidden;">
            ${inner}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const headerBlock = (subtitle?: string) => `
<tr>
  <td style="background:${BG_BODY};padding:28px 28px 24px;border-bottom:2px solid ${ACCENT};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="vertical-align:middle;">
          <span style="display:inline-block;width:44px;height:44px;line-height:44px;text-align:center;border:1.5px solid ${ACCENT};color:${ACCENT};font-weight:bold;font-size:18px;letter-spacing:2px;border-radius:4px;">DV</span>
          <span style="display:inline-block;margin-left:14px;color:${TEXT};font-size:16px;letter-spacing:3px;text-transform:uppercase;font-weight:600;vertical-align:middle;">Dana Vitan Boutique</span>
        </td>
      </tr>
      ${subtitle ? `<tr><td style="padding-top:14px;color:${LABEL};font-size:13px;text-transform:uppercase;letter-spacing:2px;">${subtitle}</td></tr>` : ""}
    </table>
  </td>
</tr>`;

const sectionBlock = (title: string, rows: Array<[string, string]>) => `
<tr>
  <td style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0 0 14px;color:${ACCENT};font-size:12px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">${title}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:6px 0;color:${LABEL};font-size:13px;width:130px;vertical-align:top;">${label}</td>
          <td style="padding:6px 0;color:${TEXT};font-size:14px;vertical-align:top;">${value}</td>
        </tr>`,
        )
        .join("")}
    </table>
  </td>
</tr>`;

// Таблица с всички артикули: Артикул | Размер | Брой | Цена.
// Стойностите се escape-ват тук (идват от клиента).
const itemsTableBlock = (
  items: OrderItem[],
  totalPrice: number,
) => `
<tr>
  <td style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0 0 14px;color:${ACCENT};font-size:12px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Артикули</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:8px 8px 8px 0;color:${LABEL};font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(255,255,255,0.12);">Артикул</td>
        <td style="padding:8px;color:${LABEL};font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.12);">Размер</td>
        <td style="padding:8px;color:${LABEL};font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.12);">Брой</td>
        <td style="padding:8px 0 8px 8px;color:${LABEL};font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:right;border-bottom:1px solid rgba(255,255,255,0.12);">Цена</td>
      </tr>
      ${items
        .map(
          (it) => `
      <tr>
        <td style="padding:10px 8px 10px 0;color:${TEXT};font-size:14px;vertical-align:top;border-bottom:1px solid rgba(255,255,255,0.06);">${escapeHtml(it.name)}</td>
        <td style="padding:10px 8px;color:${TEXT};font-size:14px;text-align:center;vertical-align:top;border-bottom:1px solid rgba(255,255,255,0.06);">${escapeHtml(it.size)}</td>
        <td style="padding:10px 8px;color:${TEXT};font-size:14px;text-align:center;vertical-align:top;border-bottom:1px solid rgba(255,255,255,0.06);">${it.quantity}</td>
        <td style="padding:10px 0 10px 8px;color:${TEXT};font-size:14px;text-align:right;vertical-align:top;border-bottom:1px solid rgba(255,255,255,0.06);">${it.price * it.quantity} €</td>
      </tr>`,
        )
        .join("")}
      <tr>
        <td colspan="3" style="padding:14px 8px 0 0;color:${TEXT};font-size:13px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Общо:</td>
        <td style="padding:14px 0 0 8px;color:${ACCENT};font-size:16px;text-align:right;font-weight:700;">${totalPrice} €</td>
      </tr>
    </table>
  </td>
</tr>`;

const footerBlock = (orderDate?: string) => `
${orderDate ? `<tr><td style="padding:18px 28px;color:${LABEL};font-size:12px;">Дата: ${orderDate}</td></tr>` : ""}
<tr>
  <td style="background:${ACCENT};padding:18px 28px;text-align:center;color:${TEXT};font-size:12px;letter-spacing:2px;text-transform:uppercase;">
    © ${new Date().getFullYear()} Dana Vitan Boutique
  </td>
</tr>`;

function escapeHtml(s: string | undefined | null): string {
  if (s === undefined || s === null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function ownerEmailHtml(d: OrderEmailData): string {
  const fullName = `${escapeHtml(d.firstName)} ${escapeHtml(d.lastName ?? "")}`.trim();
  const inner = `
    ${headerBlock("Нова поръчка")}
    ${itemsTableBlock(d.items, d.totalPrice)}
    ${sectionBlock("Данни на клиента", [
      ["Име:", fullName || "—"],
      ["Имейл:", `<a href="mailto:${escapeHtml(d.email)}" style="color:${TEXT};text-decoration:none;">${escapeHtml(d.email)}</a>`],
      ["Телефон:", `<a href="tel:${escapeHtml(d.phone ?? "")}" style="color:${TEXT};text-decoration:none;">${escapeHtml(d.phone ?? "—")}</a>`],
    ])}
    ${sectionBlock("Доставка", [
      ["Куриер:", escapeHtml(d.courierLabel)],
      ["Тип:", escapeHtml(d.deliveryLabel)],
      ["Адрес/Офис:", escapeHtml(d.deliveryDetails ?? "—")],
    ])}
    ${footerBlock(d.orderDate)}
  `;
  return wrapShell(inner);
}

export function clientEmailHtml(d: OrderEmailData): string {
  const inner = `
    ${headerBlock()}
    <tr>
      <td style="padding:28px 28px 8px;">
        <p style="margin:0 0 12px;color:${TEXT};font-size:18px;font-weight:600;">Здравейте, ${escapeHtml(d.firstName)}!</p>
        <p style="margin:0;color:${LABEL};font-size:14px;line-height:1.7;">
          Получихме вашата поръчка и се радваме, че избрахте Dana Vitan Boutique.
          Ще се свържем с вас скоро за потвърждение.
        </p>
      </td>
    </tr>
    ${itemsTableBlock(d.items, d.totalPrice)}
    ${sectionBlock("Доставка", [
      ["Куриер:", escapeHtml(d.courierLabel)],
      ["Доставка:", escapeHtml(d.deliveryLabel)],
      ["Адрес:", escapeHtml(d.deliveryDetails ?? "—")],
    ])}
    <tr>
      <td style="padding:20px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ACCENT};border-radius:4px;">
          <tr>
            <td style="padding:18px 22px;color:${TEXT};font-size:14px;line-height:1.6;">
              <strong style="display:block;margin-bottom:4px;letter-spacing:1px;text-transform:uppercase;font-size:12px;">Имате въпроси?</strong>
              Пишете ни на: <a href="mailto:danavitan@gmail.com" style="color:${TEXT};text-decoration:underline;">danavitan@gmail.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 28px;color:${LABEL};font-size:14px;line-height:1.7;">
        С уважение,<br><span style="color:${TEXT};font-weight:600;">Dana Vitan</span>
      </td>
    </tr>
    ${footerBlock()}
  `;
  return wrapShell(inner);
}

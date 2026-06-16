"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { checkoutSchema, type CheckoutFormData } from "../lib/checkoutSchema";
import { formatPriceLabel } from "../lib/format";
import { SPEEDY_CITIES } from "../lib/speedy-offices";
import { ECONT_CITIES } from "../lib/econt-offices";

type OfficeOption = { id: string; name: string; address: string };

const inputClass =
  "w-full rounded bg-[#111111] border border-[#333333] text-white text-sm px-4 py-3 placeholder:text-[#666666] transition-all duration-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

const labelClass =
  "block text-xs uppercase tracking-[0.08em] text-[#999999] mb-1.5";

const errorClass = "mt-1 text-xs text-[#E53935]";

export default function CheckoutClient() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Модал за потвърждение — остава отворен, докато клиентът сам го затвори.
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Honeypot — скрито поле срещу ботове (хората не го виждат/попълват).
  const honeypotRef = useRef<HTMLInputElement>(null);

  const closeConfirmation = () => {
    setOrderConfirmed(false);
    router.push("/");
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
  });

  const courier = watch("courier");
  const deliveryType = watch("deliveryType");

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [offices, setOffices] = useState<OfficeOption[]>([]);
  const [loadingOffices, setLoadingOffices] = useState(false);

  // При смяна на куриер изчистваме града/офиса — наличните офиси са специфични за всеки.
  useEffect(() => {
    setSelectedCity("");
    setOffices([]);
    setValue("officeId", "", { shouldValidate: false });
  }, [courier, setValue]);

  const handleCityChange = async (city: string) => {
    setSelectedCity(city);
    setValue("officeId", "", { shouldValidate: false });
    setOffices([]);
    if (!city || !courier) return;
    setLoadingOffices(true);
    try {
      const res = await fetch(`/api/offices?courier=${courier}&city=${encodeURIComponent(city)}`);
      const data = (await res.json()) as { success: boolean; offices: OfficeOption[] };
      setOffices(data.success ? data.offices : []);
    } catch {
      setOffices([]);
    } finally {
      setLoadingOffices(false);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items,
          totalPrice,
          totalItems,
          company: honeypotRef.current?.value ?? "",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setOrderConfirmed(true);
        clearCart();
      } else {
        setSubmitError("Възникна грешка. Моля, опитайте отново.");
      }
    } catch {
      setSubmitError("Възникна грешка. Моля, опитайте отново.");
    } finally {
      setLoading(false);
    }
  };

  // Празна количка — показваме съобщение вместо формата.
  // (Гардваме с !orderConfirmed, за да остане видим модалът за
  // потвърждение, след като clearCart() изпразни количката.)
  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#0a0a0a] px-6 text-center text-white">
        <h1 className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Количката е празна
        </h1>
        <p className="max-w-sm text-sm leading-6 text-white/60">
          Добавете артикули в количката, за да продължите към поръчка.
        </p>
        <Link
          href="/shop"
          className="rounded-full border border-accent bg-accent px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent"
        >
          Към магазина
        </Link>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-[#0a0a0a] px-6 pb-20 pt-24 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[38fr_62fr]">
          {/* ── ЛЯВА КОЛОНА — Обобщение ── */}
          <aside>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              Вашата поръчка{totalItems > 0 ? ` (${totalItems})` : ""}
            </h2>

            <div className="rounded border border-accent bg-[#111111] p-5">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={`${item.slug}-${item.size}`} className="flex gap-4">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded bg-black">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center text-sm">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-white/60">
                        Размер: <span className="text-white">{item.size}</span>
                      </p>
                      <p className="mt-1 text-white/60">
                        {formatPriceLabel(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center text-sm font-medium text-white">
                      {formatPriceLabel(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-t border-white/10" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Доставка:</span>
                <span className="text-white">по договаряне с куриер</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider text-white/70">ОБЩО:</span>
                <span className="text-lg font-bold text-accent">{formatPriceLabel(totalPrice)}</span>
              </div>
            </div>

            <p className="mt-3 text-xs italic text-white/50">
              * Точната цена за доставка се уточнява след потвърждение.
            </p>
          </aside>

          {/* ── ДЯСНА КОЛОНА — Форма ── */}
          <section>
            <h1 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Данни за доставка
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              {/* Honeypot — невидимо за хора, попълва се само от ботове */}
              <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="company">Фирма</label>
                <input
                  id="company"
                  ref={honeypotRef}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Лични данни */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>Име*</label>
                  <input id="firstName" type="text" autoComplete="given-name" {...register("firstName")} className={inputClass} placeholder="Иван" />
                  {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>Фамилия*</label>
                  <input id="lastName" type="text" autoComplete="family-name" {...register("lastName")} className={inputClass} placeholder="Иванов" />
                  {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClass}>Имейл*</label>
                  <input id="email" type="email" autoComplete="email" {...register("email")} className={inputClass} placeholder="primer@email.bg" />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Телефон*</label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]*"
                    {...register("phone")}
                    onInput={(e) => {
                      const input = e.currentTarget;
                      input.value = input.value.replace(/[^0-9]/g, "");
                    }}
                    className={inputClass}
                    placeholder="08XXXXXXXX"
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                </div>
              </div>

              {/* Куриер */}
              <div>
                <p className={labelClass}>Куриер</p>
                <div className="grid grid-cols-2 gap-3">
                  {(["econt", "speedy"] as const).map((c) => {
                    const isSel = courier === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setValue("courier", c, { shouldValidate: true })}
                        className={`flex flex-col items-start gap-1 rounded p-4 text-left transition-all duration-200 ${
                          isSel
                            ? "border-2 border-accent bg-accent/[0.08]"
                            : "border border-[#333333] bg-[#111111] hover:border-white/30"
                        }`}
                        aria-pressed={isSel ? "true" : "false"}
                      >
                        <span className="text-sm font-semibold uppercase tracking-wider text-white">
                          {c === "econt" ? "Еконт" : "Speedy"}
                        </span>
                        <span className="text-xs text-white/55">Бърза доставка</span>
                      </button>
                    );
                  })}
                </div>
                {/* hidden input for register */}
                <input type="hidden" {...register("courier")} />
                {errors.courier && <p className={errorClass}>{errors.courier.message}</p>}
              </div>

              {/* Тип доставка — show only after courier chosen */}
              {courier && (
                <div>
                  <p className={labelClass}>Тип доставка</p>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { v: "address", title: "До адрес", desc: "Доставяме до вас" },
                      { v: "office", title: "До офис", desc: "Вземете от офис" },
                    ] as const).map((opt) => {
                      const isSel = deliveryType === opt.v;
                      return (
                        <button
                          key={opt.v}
                          type="button"
                          onClick={() => setValue("deliveryType", opt.v, { shouldValidate: true })}
                          className={`flex flex-col items-start gap-1 rounded p-4 text-left transition-all duration-200 ${
                            isSel
                              ? "border-2 border-accent bg-accent/[0.08]"
                              : "border border-[#333333] bg-[#111111] hover:border-white/30"
                          }`}
                          aria-pressed={isSel ? "true" : "false"}
                        >
                          <span className="text-sm font-semibold uppercase tracking-wider text-white">
                            {opt.title}
                          </span>
                          <span className="text-xs text-white/55">{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                  <input type="hidden" {...register("deliveryType")} />
                  {errors.deliveryType && <p className={errorClass}>{errors.deliveryType.message}</p>}
                </div>
              )}

              {/* Адресни полета */}
              {deliveryType === "address" && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="city" className={labelClass}>Град*</label>
                    <input id="city" type="text" autoComplete="address-level2" {...register("city")} className={inputClass} placeholder="София" />
                    {errors.city && <p className={errorClass}>{errors.city.message}</p>}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <div>
                      <label htmlFor="street" className={labelClass}>Улица*</label>
                      <input id="street" type="text" autoComplete="address-line1" {...register("street")} className={inputClass} placeholder="ул. Витоша" />
                      {errors.street && <p className={errorClass}>{errors.street.message}</p>}
                    </div>
                    <div className="sm:w-32">
                      <label htmlFor="streetNumber" className={labelClass}>Номер*</label>
                      <input id="streetNumber" type="text" {...register("streetNumber")} className={inputClass} placeholder="12" />
                      {errors.streetNumber && <p className={errorClass}>{errors.streetNumber.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {deliveryType === "office" && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="officeCity" className={labelClass}>Град*</label>
                    <select
                      id="officeCity"
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Изберете град...</option>
                      {(courier === "speedy" ? SPEEDY_CITIES : ECONT_CITIES).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCity && (
                    <div>
                      <label htmlFor="officeId" className={labelClass}>Офис*</label>
                      <select
                        id="officeId"
                        disabled={loadingOffices}
                        {...register("officeId")}
                        defaultValue=""
                        className={`${inputClass} ${loadingOffices ? "cursor-wait opacity-60" : ""}`}
                      >
                        <option value="" disabled>
                          {loadingOffices
                            ? "Зареждане..."
                            : offices.length === 0
                              ? "Няма налични офиси в този град"
                              : "Изберете офис..."}
                        </option>
                        {offices.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.name} — {o.address}
                          </option>
                        ))}
                      </select>
                      {errors.officeId && <p className={errorClass}>{errors.officeId.message}</p>}
                    </div>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded bg-accent py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-200 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-accent"
              >
                {loading && (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                )}
                {loading ? "Изпращане..." : "Изпрати поръчка"}
              </button>

              {submitError && (
                <p className="text-center text-sm text-[#E53935]" role="alert">
                  {submitError}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </div>

    {/* Модал за потвърждение — БЕЗ авто-затваряне; затваря се само от X. */}
    {orderConfirmed && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmed-title"
      >
        <div className="relative w-full max-w-md rounded-2xl border border-accent bg-[#111111] p-8 text-center shadow-2xl">
          {/* X бутон горе вдясно */}
          <button
            type="button"
            onClick={closeConfirmation}
            aria-label="Затвори"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-200 hover:border-accent hover:text-white"
          >
            ✕
          </button>

          {/* Чек-марка */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-accent text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="5 12.5 10 17.5 19 7.5" />
            </svg>
          </div>

          <h2 id="order-confirmed-title" className="mt-6 text-2xl font-semibold text-white">
            Поръчката е успешна!
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Благодарим ви! Изпратихме потвърждение на вашия имейл. Ще се свържем с
            вас скоро за уточняване на детайлите по доставката.
          </p>

          <button
            type="button"
            onClick={closeConfirmation}
            className="mt-7 w-full rounded bg-accent py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-accent-strong"
          >
            Затвори
          </button>
        </div>
      </div>
    )}
    </>
  );
}

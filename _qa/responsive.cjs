// Респонсивен одит: всеки маршрут × 9 ширини.
// Засича хоризонтален overflow, най-широкия „виновен" елемент, прави screenshot.
const { chromium } = require("@playwright/test");

const BASE = "http://localhost:3100";
const ROUTES = [
  ["home", "/"],
  ["shop", "/shop"],
  ["product", "/shop/geta"],
  ["about", "/about"],
  ["contacts", "/contacts"],
  ["404", "/shop/no-such-product-xyz"],
];
const WIDTHS = [320, 375, 390, 414, 768, 1024, 1280, 1440, 1920];

(async () => {
  const browser = await chromium.launch();
  const findings = [];
  for (const [name, path] of ROUTES) {
    for (const w of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      const resp = await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 30000 }).catch(() => null);
      await page.waitForTimeout(600); // дай време за анимации/изображения
      const info = await page.evaluate(() => {
        const de = document.documentElement;
        const overflow = de.scrollWidth - de.clientWidth;
        let worst = null;
        if (overflow > 1) {
          const vw = de.clientWidth;
          let maxRight = vw;
          document.querySelectorAll("*").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.right > maxRight + 1 && r.width > 0 && r.height > 0) {
              maxRight = r.right;
              worst = (el.tagName.toLowerCase() + "." + (el.className?.toString().slice(0, 60) || "")).trim();
            }
          });
        }
        return { overflow, worst, status: document.readyState };
      });
      const status = resp ? resp.status() : "ERR";
      await page.screenshot({ path: `_qa/shots/${name}-${w}.png`, fullPage: true }).catch(() => {});
      if (info.overflow > 1) {
        findings.push({ name, w, overflow: info.overflow, worst: info.worst });
        console.log(`OVERFLOW  ${name.padEnd(9)} ${String(w).padStart(4)}px  +${info.overflow}px  →  ${info.worst || "?"}`);
      } else {
        console.log(`ok        ${name.padEnd(9)} ${String(w).padStart(4)}px  (${status})`);
      }
      await ctx.close();
    }
  }
  await browser.close();
  console.log("\n=== РЕЗЮМЕ ===");
  console.log(findings.length ? `${findings.length} случая с overflow` : "Няма хоризонтален overflow на нито една ширина ✅");
})();

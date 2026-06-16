// Cross-browser smoke (Firefox + WebKit) + edge cases.
const pw = require("@playwright/test");
const BASE = "http://localhost:3100";

const PAGES = [
  ["home", "/"],
  ["shop", "/shop"],
  ["product", "/shop/geta"],
  ["contacts", "/contacts"],
];

async function smoke(engineName, engine) {
  const browser = await engine.launch();
  console.log(`\n=== ${engineName} ===`);
  for (const [name, path] of PAGES) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 80)));
    page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message.slice(0, 80)));
    const resp = await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 30000 }).catch(() => null);
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`  ${name.padEnd(9)} ${resp ? resp.status() : "ERR"}  overflow:${overflow > 1 ? "+" + overflow + "px" : "0"}  console-errors:${errors.length}`);
    errors.slice(0, 3).forEach((e) => console.log("       ⚠ " + e));
    await ctx.close();
  }
  await browser.close();
}

(async () => {
  await smoke("Firefox", pw.firefox);
  await smoke("WebKit (Safari)", pw.webkit);

  // ===== Edge cases (Chromium) =====
  console.log("\n=== EDGE CASES ===");
  const b = await pw.chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();

  // 1) Категория без реални продукти (Поли) → празно състояние
  await page.goto(BASE + "/shop?category=poli", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const emptyState = await page.locator("text=Очаквайте скоро").count();
  console.log(`  Поли (0 реални) → "Очаквайте скоро" видимо: ${emptyState > 0 ? "ДА ✅" : "НЕ ❌"}`);

  // 2) Празна количка → отвори drawer-а
  await page.goto(BASE + "/shop", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const cartBtn = page.locator('button[aria-label*="количк" i], a[aria-label*="количк" i], [aria-label*="cart" i]').first();
  let cartOpened = "не намерен бутон";
  if (await cartBtn.count()) {
    await cartBtn.click().catch(() => {});
    await page.waitForTimeout(500);
    const emptyCart = await page.locator("text=/празна|empty|няма продукти/i").count();
    cartOpened = emptyCart > 0 ? "показва празно състояние ✅" : "отворен, но без явен empty текст";
  }
  console.log(`  Празна количка: ${cartOpened}`);

  // 3) Липсваща снимка (счупен src) → проверка дали layout се пази
  await page.goto(BASE + "/shop/geta", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const imgsBroken = await page.evaluate(() =>
    [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length
  );
  console.log(`  Счупени <img> на продуктова страница: ${imgsBroken}`);

  await ctx.close();
  await b.close();
  console.log("\nГотово.");
})();

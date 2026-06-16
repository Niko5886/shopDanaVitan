// Достъпност (axe-core) по маршрутите, на мобилен и десктоп viewport.
const { chromium } = require("@playwright/test");
const { AxeBuilder } = require("@axe-core/playwright");

const BASE = "http://localhost:3100";
const ROUTES = [
  ["home", "/"],
  ["shop", "/shop"],
  ["product", "/shop/geta"],
  ["about", "/about"],
  ["contacts", "/contacts"],
];

(async () => {
  const browser = await chromium.launch();
  const agg = {}; // id -> { impact, nodes, routes:Set }
  for (const [name, path] of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    for (const v of results.violations) {
      if (!agg[v.id]) agg[v.id] = { impact: v.impact, nodes: 0, routes: new Set(), help: v.help };
      agg[v.id].nodes += v.nodes.length;
      agg[v.id].routes.add(name);
    }
    console.log(`${name.padEnd(9)} → ${results.violations.length} вида нарушения`);
    await ctx.close();
  }
  await browser.close();
  const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
  console.log("\n=== АГРЕГИРАНИ A11Y НАРУШЕНИЯ (axe, WCAG 2.1 A/AA) ===");
  Object.entries(agg)
    .sort((a, b) => (order[a[1].impact] ?? 9) - (order[b[1].impact] ?? 9))
    .forEach(([id, d]) =>
      console.log(`[${(d.impact || "?").toUpperCase()}] ${id} — ${d.nodes} възела — ${[...d.routes].join(", ")}\n     ${d.help}`)
    );
})();

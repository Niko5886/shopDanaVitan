// Форматиране на цени за показване (български/EUR стил).
// Стойността в Sanity си остава число (напр. 24.8); тук само я показваме
// коректно като „24,80" — 2 десетични знака, десетична ЗАПЕТАЯ и интервал
// за хилядите (1 200,00). Форматът е детерминистичен (не зависи от locale на
// сървъра/браузъра), за да няма разлика SSR ↔ клиент (hydration).

export function formatPrice(n: number): string {
  const safe = Number.isFinite(n) ? n : 0;
  const fixed = (Math.round(safe * 100) / 100).toFixed(2); // "24.80"
  const [intPart, decPart] = fixed.split(".");
  // Интервал (NBSP) за разделител на хилядите: 1200 → "1 200".
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped},${decPart}`;
}

// Цена + знак за валута: 24.8 → „24,80 €".
export function formatPriceLabel(n: number): string {
  return `${formatPrice(n)} €`;
}

// Централизирани константи за сайта — използвани от metadata, robots и sitemap.
// Домейнът се чете от NEXT_PUBLIC_SITE_URL (задава се в Netlify env);
// fallback-ът се ползва само ако променливата липсва.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://danavitan.com"
).replace(/\/$/, "");

export const SITE_NAME = "Dana Vitan Boutique";

export const SITE_DESCRIPTION =
  "Бутикови дрехи, стилизирани носии и аксесоари с ръчна изработка и персонална консултация.";

// Глобално Open Graph изображение (логото на бранда).
export const OG_IMAGE = "/images/Dana_Vitan_png2.png";

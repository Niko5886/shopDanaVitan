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

// Контакти и социални профили (ползват се и в JSON-LD структурираните данни).
export const SITE_EMAIL = "dana13@abv.bg";
export const SITE_LEGAL_NAME = "АМД Дана Стил ЕООД";
export const SITE_ADDRESS = {
  street: "ул. Николаевска 80",
  city: "Русе",
  country: "BG",
};
export const SITE_SOCIALS = [
  "https://www.instagram.com/dana_vitan8",
  "https://www.facebook.com/AMDSTYLE",
];

// Structured data за бизнеса (LocalBusiness / ClothingStore) — вмъква се
// сайтово в layout-а. Помага за локалното SEO (Google Maps, „бутик Русе").
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}${OG_IMAGE}`,
  image: `${SITE_URL}${OG_IMAGE}`,
  email: SITE_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_ADDRESS.street,
    addressLocality: SITE_ADDRESS.city,
    addressCountry: SITE_ADDRESS.country,
  },
  sameAs: SITE_SOCIALS,
};

// ⚠️ Източникът на продуктовите данни вече е Sanity (виж sanity/lib/queries.ts).
// Този файл пази САМО споделените типове на продукта, които компонентите и
// заявките ползват (Product и помощните типове/карта). Оригиналният масив с
// 54-те seed продукта е архивиран в data/products.ts.bak за връщане назад.

export type CategoryName = "Поли" | "Рокли" | "Ризи" | "Топове" | "Сака" | "Аксесоари";
export type CategorySlug = "poli" | "rokli" | "rizi" | "topove" | "saka" | "aksesoari";

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: CategoryName;
  categorySlug: CategorySlug;
  price: number;
  priceLabel: string;
  note?: string;
  description: string;
  sizes: string[];
  images: string[];
  thumb?: string;
  focalPoints?: { x: number; y: number }[];
};

export type ProductWithImages = Product;

// Карта категория → slug (използва се и в GROQ заявката със select()).
export const CATEGORY_TO_SLUG: Record<CategoryName, CategorySlug> = {
  Поли: "poli",
  Рокли: "rokli",
  Ризи: "rizi",
  Топове: "topove",
  Сака: "saka",
  Аксесоари: "aksesoari",
};

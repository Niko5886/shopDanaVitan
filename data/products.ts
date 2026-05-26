export type Product = {
  id: string;
  title: string;
  category: "Поли" | "Рокли" | "Ризи" | "Топове" | "Сака" | "Аксесоари";
  price: string;
  note?: string;
  description: string;
  sizes: string[];
};

export type ProductWithImages = Product & { images?: string[]; thumb?: string; focalPoints?: { x: number; y: number }[] };

const SIZE_BY_CATEGORY: Record<Product["category"], string[]> = {
  Поли: ["S", "M", "L"],
  Рокли: ["XS", "S", "M", "L"],
  Ризи: ["S", "M", "L", "XL"],
  Топове: ["XS", "S", "M"],
  Сака: ["S", "M", "L"],
  Аксесоари: ["Един размер"],
};

function createProduct(product: Omit<ProductWithImages, "description" | "sizes">): ProductWithImages {
  return {
    ...product,
    sizes: SIZE_BY_CATEGORY[product.category],
    description:
      `${product.note ?? "Бутиково изделие"} — изчистен силует, премиум завършек и бордо акценти, създадени за уверено присъствие.`,
  };
}

export const products: ProductWithImages[] = [
  // Трите карти, всяка съдържа 3 реални снимки от imgDana (1-3, 4-6, 7-9)
  createProduct({
    id: "card-1",
    title: "Колекция Единица",
    category: "Рокли",
    price: "690 лв.",
    note: "Три визии в една карта",
    images: [
      "/assets/imgDana/product-01.webp",
      "/assets/imgDana/product-02.webp",
      "/assets/imgDana/product-03.webp",
    ],
    thumb: "/assets/imgDana/product-01-thumb.webp",
    focalPoints: [
      { x: 50, y: 30 },
      { x: 50, y: 30 },
      { x: 50, y: 30 },
    ],
  }),
  createProduct({
    id: "card-2",
    title: "Колекция Две",
    category: "Поли",
    price: "420 лв.",
    note: "Многообразие от текстури",
    images: [
      "/assets/imgDana/product-04.webp",
      "/assets/imgDana/product-05.webp",
      "/assets/imgDana/product-06.webp",
    ],
    thumb: "/assets/imgDana/product-04-thumb.webp",
    focalPoints: [
      { x: 50, y: 30 },
      { x: 50, y: 30 },
      { x: 50, y: 30 },
    ],
  }),
  createProduct({
    id: "card-3",
    title: "Колекция Три",
    category: "Топове",
    price: "980 лв.",
    note: "Ексклузивни детайли",
    images: [
      "/assets/imgDana/product-07.webp",
      "/assets/imgDana/product-08.webp",
      "/assets/imgDana/product-09.webp",
    ],
    thumb: "/assets/imgDana/product-07-thumb.webp",
    focalPoints: [
      { x: 50, y: 30 },
      { x: 50, y: 30 },
      { x: 50, y: 30 },
    ],
  }),

  // Останалите продукти остават като отдельни артикули (без multiple images)
  createProduct({ id: "p10", title: "Риза Леко", category: "Ризи", price: "150 лв.", note: "Модерен крой" }),
  createProduct({ id: "p11", title: "Сака Ателие", category: "Сака", price: "720 лв.", note: "Персонализирана" }),
  createProduct({ id: "p12", title: "Шал Бордо", category: "Аксесоари", price: "60 лв.", note: "Копринен" }),
  createProduct({ id: "p13", title: "Рокля Ритуал", category: "Рокли", price: "1200 лв.", note: "Лимитирана" }),
  createProduct({ id: "p14", title: "Пола Традиция", category: "Поли", price: "300 лв.", note: "Ръчна бродерия" }),
  createProduct({ id: "p15", title: "Топ Фина", category: "Топове", price: "130 лв.", note: "Коприна" }),
  createProduct({ id: "p16", title: "Риза Елеганс", category: "Ризи", price: "180 лв.", note: "Натурални нишки" }),
  createProduct({ id: "p17", title: "Сака Град", category: "Сака", price: "650 лв.", note: "Съвременен силует" }),
  createProduct({ id: "p18", title: "Гривна Ръчна", category: "Аксесоари", price: "80 лв.", note: "Медно и кожа" }),
];

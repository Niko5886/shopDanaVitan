export type Product = {
  id: string;
  title: string;
  category: "Поли" | "Рокли" | "Ризи" | "Топове" | "Сака" | "Аксесоари";
  price: string;
  note?: string;
  description: string;
  sizes: string[];
  placeholder?: boolean; // true = очаквана карта, не е кликаема
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

// Помощна функция за placeholder карти (попълват до 9 на категория)
function createPlaceholder(id: string, category: Product["category"]): ProductWithImages {
  return {
    id,
    title: "Очаквайте скоро",
    category,
    price: "",
    note: "Скоро в колекцията",
    description: "Скоро в колекцията — следете за нови изделия.",
    sizes: SIZE_BY_CATEGORY[category],
    placeholder: true,
    images: [],
  };
}

export const products: ProductWithImages[] = [
  // ─── РОКЛИ (2 реални + 7 placeholder = 9) ───────────────────────────────
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
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createProduct({
    id: "p13",
    title: "Рокля Ритуал",
    category: "Рокли",
    price: "1200 лв.",
    note: "Лимитирана",
    images: [
      "/assets/imgDana/product-04.webp",
      "/assets/imgDana/product-05.webp",
      "/assets/imgDana/product-06.webp",
    ],
    thumb: "/assets/imgDana/product-04-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createPlaceholder("ph-rokli-1", "Рокли"),
  createPlaceholder("ph-rokli-2", "Рокли"),
  createPlaceholder("ph-rokli-3", "Рокли"),
  createPlaceholder("ph-rokli-4", "Рокли"),
  createPlaceholder("ph-rokli-5", "Рокли"),
  createPlaceholder("ph-rokli-6", "Рокли"),
  createPlaceholder("ph-rokli-7", "Рокли"),

  // ─── ПОЛИ (2 реални + 7 placeholder = 9) ────────────────────────────────
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
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createProduct({
    id: "p14",
    title: "Пола Традиция",
    category: "Поли",
    price: "300 лв.",
    note: "Ръчна бродерия",
    images: [
      "/assets/imgDana/product-07.webp",
      "/assets/imgDana/product-08.webp",
      "/assets/imgDana/product-09.webp",
    ],
    thumb: "/assets/imgDana/product-07-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createPlaceholder("ph-poli-1", "Поли"),
  createPlaceholder("ph-poli-2", "Поли"),
  createPlaceholder("ph-poli-3", "Поли"),
  createPlaceholder("ph-poli-4", "Поли"),
  createPlaceholder("ph-poli-5", "Поли"),
  createPlaceholder("ph-poli-6", "Поли"),
  createPlaceholder("ph-poli-7", "Поли"),

  // ─── ТОПОВЕ (3 реални + 6 placeholder = 9) ──────────────────────────────
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
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createProduct({
    id: "card-5",
    title: "Колекция Кежуал II",
    category: "Топове",
    price: "610 лв.",
    note: "Съвременен силует и фин детайл",
    images: [
      "/assets/imgDana/product-13.webp",
      "/assets/imgDana/product-14.webp",
      "/assets/imgDana/product-15.webp",
    ],
    thumb: "/assets/imgDana/product-13-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createProduct({
    id: "p15",
    title: "Топ Фина",
    category: "Топове",
    price: "130 лв.",
    note: "Коприна",
    images: [
      "/assets/imgDana/product-10.webp",
      "/assets/imgDana/product-11.webp",
      "/assets/imgDana/product-12.webp",
    ],
    thumb: "/assets/imgDana/product-10-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createPlaceholder("ph-topove-1", "Топове"),
  createPlaceholder("ph-topove-2", "Топове"),
  createPlaceholder("ph-topove-3", "Топове"),
  createPlaceholder("ph-topove-4", "Топове"),
  createPlaceholder("ph-topove-5", "Топове"),
  createPlaceholder("ph-topove-6", "Топове"),

  // ─── РИЗИ (3 реални + 6 placeholder = 9) ────────────────────────────────
  createProduct({
    id: "card-4",
    title: "Колекция Кежуал I",
    category: "Ризи",
    price: "560 лв.",
    note: "Нови визии в същия бутиков стил",
    images: [
      "/assets/imgDana/product-10.webp",
      "/assets/imgDana/product-11.webp",
      "/assets/imgDana/product-12.webp",
    ],
    thumb: "/assets/imgDana/product-10-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createProduct({
    id: "p10",
    title: "Риза Леко",
    category: "Ризи",
    price: "150 лв.",
    note: "Модерен крой",
    images: [
      "/assets/imgDana/product-10.webp",
      "/assets/imgDana/product-11.webp",
      "/assets/imgDana/product-12.webp",
    ],
    thumb: "/assets/imgDana/product-10-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createProduct({
    id: "p16",
    title: "Риза Елеганс",
    category: "Ризи",
    price: "180 лв.",
    note: "Натурални нишки",
    images: [
      "/assets/imgDana/product-13.webp",
      "/assets/imgDana/product-14.webp",
      "/assets/imgDana/product-15.webp",
    ],
    thumb: "/assets/imgDana/product-13-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createPlaceholder("ph-rizi-1", "Ризи"),
  createPlaceholder("ph-rizi-2", "Ризи"),
  createPlaceholder("ph-rizi-3", "Ризи"),
  createPlaceholder("ph-rizi-4", "Ризи"),
  createPlaceholder("ph-rizi-5", "Ризи"),
  createPlaceholder("ph-rizi-6", "Ризи"),

  // ─── САКА (2 реални + 7 placeholder = 9) ────────────────────────────────
  createProduct({
    id: "p11",
    title: "Сака Ателие",
    category: "Сака",
    price: "720 лв.",
    note: "Персонализирана",
    images: [
      "/assets/imgDana/product-13.webp",
      "/assets/imgDana/product-14.webp",
      "/assets/imgDana/product-15.webp",
    ],
    thumb: "/assets/imgDana/product-13-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createProduct({
    id: "p17",
    title: "Сака Град",
    category: "Сака",
    price: "650 лв.",
    note: "Съвременен силует",
    images: [
      "/assets/imgDana/product-01.webp",
      "/assets/imgDana/product-02.webp",
      "/assets/imgDana/product-03.webp",
    ],
    thumb: "/assets/imgDana/product-01-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createPlaceholder("ph-saka-1", "Сака"),
  createPlaceholder("ph-saka-2", "Сака"),
  createPlaceholder("ph-saka-3", "Сака"),
  createPlaceholder("ph-saka-4", "Сака"),
  createPlaceholder("ph-saka-5", "Сака"),
  createPlaceholder("ph-saka-6", "Сака"),
  createPlaceholder("ph-saka-7", "Сака"),

  // ─── АКСЕСОАРИ (2 реални + 7 placeholder = 9) ───────────────────────────
  createProduct({
    id: "p12",
    title: "Шал Бордо",
    category: "Аксесоари",
    price: "60 лв.",
    note: "Копринен",
    images: [
      "/assets/imgDana/product-01.webp",
      "/assets/imgDana/product-02.webp",
      "/assets/imgDana/product-03.webp",
    ],
    thumb: "/assets/imgDana/product-01-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createProduct({
    id: "p18",
    title: "Гривна Ръчна",
    category: "Аксесоари",
    price: "80 лв.",
    note: "Медно и кожа",
    images: [
      "/assets/imgDana/product-04.webp",
      "/assets/imgDana/product-05.webp",
      "/assets/imgDana/product-06.webp",
    ],
    thumb: "/assets/imgDana/product-04-thumb.webp",
    focalPoints: [{ x: 50, y: 30 }, { x: 50, y: 30 }, { x: 50, y: 30 }],
  }),
  createPlaceholder("ph-aks-1", "Аксесоари"),
  createPlaceholder("ph-aks-2", "Аксесоари"),
  createPlaceholder("ph-aks-3", "Аксесоари"),
  createPlaceholder("ph-aks-4", "Аксесоари"),
  createPlaceholder("ph-aks-5", "Аксесоари"),
  createPlaceholder("ph-aks-6", "Аксесоари"),
  createPlaceholder("ph-aks-7", "Аксесоари"),
];

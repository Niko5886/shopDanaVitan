export type Product = {
  id: string;
  title: string;
  category: "Поли" | "Рокли" | "Ризи" | "Топове" | "Сака" | "Аксесоари";
  price: string;
  note?: string;
};

export type ProductWithImages = Product & { images?: string[]; thumb?: string; focalPoints?: { x: number; y: number }[] };

export const products: ProductWithImages[] = [
  // Трите карти, всяка съдържа 3 реални снимки от imgDana (1-3, 4-6, 7-9)
  {
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
  },
  {
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
  },
  {
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
  },

  // Останалите продукти остават като отдельни артикули (без multiple images)
  { id: "p10", title: "Риза Леко", category: "Ризи", price: "150 лв.", note: "Модерен крой" },
  { id: "p11", title: "Сака Ателие", category: "Сака", price: "720 лв.", note: "Персонализирана" },
  { id: "p12", title: "Шал Бордо", category: "Аксесоари", price: "60 лв.", note: "Копринен" },
  { id: "p13", title: "Рокля Ритуал", category: "Рокли", price: "1200 лв.", note: "Лимитирана" },
  { id: "p14", title: "Пола Традиция", category: "Поли", price: "300 лв.", note: "Ръчна бродерия" },
  { id: "p15", title: "Топ Фина", category: "Топове", price: "130 лв.", note: "Коприна" },
  { id: "p16", title: "Риза Елеганс", category: "Ризи", price: "180 лв.", note: "Натурални нишки" },
  { id: "p17", title: "Сака Град", category: "Сака", price: "650 лв.", note: "Съвременен силует" },
  { id: "p18", title: "Гривна Ръчна", category: "Аксесоари", price: "80 лв.", note: "Медно и кожа" },
];

export type Product = {
  id: string;
  title: string;
  category: "Поли" | "Рокли" | "Ризи" | "Топове" | "Сака" | "Аксесоари";
  price: string;
  note?: string;
};

export const products: Product[] = [
  { id: "p1", title: "Рокля Лунна", category: "Рокли", price: "690 лв.", note: "Сатен, бордо кант", image: "/assets/imgDana/product-01.webp", thumb: "/assets/imgDana/product-01-thumb.webp" },
  { id: "p2", title: "Елек Тъмна шевица", category: "Сака", price: "420 лв.", note: "Ръчна бродерия", image: "/assets/imgDana/product-02.webp", thumb: "/assets/imgDana/product-02-thumb.webp" },
  { id: "p3", title: "Пола Вечер", category: "Поли", price: "220 лв.", note: "Мека вълна", image: "/assets/imgDana/product-03.webp", thumb: "/assets/imgDana/product-03-thumb.webp" },
  { id: "p4", title: "Топ Силует", category: "Топове", price: "120 лв.", note: "Копринен детайл", image: "/assets/imgDana/product-04.webp", thumb: "/assets/imgDana/product-04-thumb.webp" },
  { id: "p5", title: "Риза Класика", category: "Ризи", price: "160 лв.", note: "Лен", image: "/assets/imgDana/product-05.webp", thumb: "/assets/imgDana/product-05-thumb.webp" },
  { id: "p6", title: "Колан Бордо", category: "Аксесоари", price: "45 лв.", note: "Ръчна нишка", image: "/assets/imgDana/product-06.webp", thumb: "/assets/imgDana/product-06-thumb.webp" },
  { id: "p7", title: "Рокля Залез", category: "Рокли", price: "980 лв.", note: "Вълна и коприна", image: "/assets/imgDana/product-07.webp", thumb: "/assets/imgDana/product-07-thumb.webp" },
  { id: "p8", title: "Пола Линеа", category: "Поли", price: "240 лв.", note: "Асиметричен силует", image: "/assets/imgDana/product-08.webp", thumb: "/assets/imgDana/product-08-thumb.webp" },
  { id: "p9", title: "Топ Нощ", category: "Топове", price: "110 лв.", note: "Детайл бордо", image: "/assets/imgDana/product-09.webp", thumb: "/assets/imgDana/product-09-thumb.webp" },
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

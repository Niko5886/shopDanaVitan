export type Product = {
  id: string;
  title: string;
  category: "Поли" | "Рокли" | "Ризи" | "Топове" | "Сака" | "Аксесоари";
  price: string;
  note?: string;
};

export const products: Product[] = [
  { id: "p1", title: "Рокля Лунна", category: "Рокли", price: "690 лв.", note: "Сатен, бордо кант" },
  { id: "p2", title: "Елек Тъмна шевица", category: "Сака", price: "420 лв.", note: "Ръчна бродерия" },
  { id: "p3", title: "Пола Вечер", category: "Поли", price: "220 лв.", note: "Мека вълна" },
  { id: "p4", title: "Топ Силует", category: "Топове", price: "120 лв.", note: "Копринен детайл" },
  { id: "p5", title: "Риза Класика", category: "Ризи", price: "160 лв.", note: "Лен" },
  { id: "p6", title: "Колан Бордо", category: "Аксесоари", price: "45 лв.", note: "Ръчна нишка" },
  { id: "p7", title: "Рокля Залез", category: "Рокли", price: "980 лв.", note: "Вълна и коприна" },
  { id: "p8", title: "Пола Линеа", category: "Поли", price: "240 лв.", note: "Асиметричен силует" },
  { id: "p9", title: "Топ Нощ", category: "Топове", price: "110 лв.", note: "Детайл бордо" },
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

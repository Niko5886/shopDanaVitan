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

export const CATEGORY_TO_SLUG: Record<CategoryName, CategorySlug> = {
  Поли: "poli",
  Рокли: "rokli",
  Ризи: "rizi",
  Топове: "topove",
  Сака: "saka",
  Аксесоари: "aksesoari",
};

const SIZE_BY_CATEGORY: Record<CategoryName, string[]> = {
  Поли: ["XS", "S", "M", "L", "XL", "XXL"],
  Рокли: ["XS", "S", "M", "L", "XL", "XXL"],
  Топове: ["XS", "S", "M", "L", "XL", "XXL"],
  Ризи: ["XS", "S", "M", "L", "XL"],
  Сака: ["XS", "S", "M", "L", "XL"],
  Аксесоари: ["Един размер"],
};

// Генератор за изображения — циклира из 15-те налични product-XX.webp файла.
function imagesFor(startIdx: number): { images: string[]; thumb: string; focalPoints: { x: number; y: number }[] } {
  const pick = (offset: number) => {
    const i = ((startIdx - 1 + offset) % 15) + 1;
    return String(i).padStart(2, "0");
  };
  const a = pick(0);
  const b = pick(1);
  const c = pick(2);
  return {
    images: [
      `/assets/imgDana/product-${a}.webp`,
      `/assets/imgDana/product-${b}.webp`,
      `/assets/imgDana/product-${c}.webp`,
    ],
    thumb: `/assets/imgDana/product-${a}-thumb.webp`,
    focalPoints: [
      { x: 50, y: 30 },
      { x: 50, y: 30 },
      { x: 50, y: 30 },
    ],
  };
}

type Input = {
  slug: string;
  title: string;
  category: CategoryName;
  price: number;
  note: string;
  description?: string;
  imgStart: number; // 1..15
};

function make(p: Input): Product {
  const img = imagesFor(p.imgStart);
  return {
    id: p.slug,
    slug: p.slug,
    title: p.title,
    category: p.category,
    categorySlug: CATEGORY_TO_SLUG[p.category],
    price: p.price,
    priceLabel: `${p.price} лв.`,
    note: p.note,
    description:
      p.description ??
      `${p.note} — изчистен силует, премиум завършек и бордо акценти, създадени за уверено присъствие. Изработка с фокус върху детайла и материите.`,
    sizes: SIZE_BY_CATEGORY[p.category],
    images: img.images,
    thumb: img.thumb,
    focalPoints: img.focalPoints,
  };
}

export const products: Product[] = [
  // ─── РОКЛИ (9) ──────────────────────────────────────────────────────────
  make({ slug: "kolektsiya-edinitsa", title: "Колекция Единица", category: "Рокли", price: 690, note: "Три визии в една карта", imgStart: 1 }),
  make({ slug: "roklya-ritual", title: "Рокля Ритуал", category: "Рокли", price: 1200, note: "Лимитирана серия", imgStart: 4 }),
  make({ slug: "roklya-kalina", title: "Рокля Калина", category: "Рокли", price: 580, note: "Ръчно изработена", imgStart: 7 }),
  make({ slug: "roklya-yoana", title: "Рокля Йоана", category: "Рокли", price: 650, note: "Етно мотиви", imgStart: 10 }),
  make({ slug: "roklya-stefaniya", title: "Рокля Стефания", category: "Рокли", price: 720, note: "Вечерна визия", imgStart: 13 }),
  make({ slug: "roklya-magnoliya", title: "Рокля Магнолия", category: "Рокли", price: 540, note: "Натурален лен", imgStart: 2 }),
  make({ slug: "roklya-eva", title: "Рокля Ева", category: "Рокли", price: 480, note: "Минималистичен крой", imgStart: 5 }),
  make({ slug: "roklya-liliya", title: "Рокля Лилия", category: "Рокли", price: 690, note: "Бутикова бродерия", imgStart: 8 }),
  make({ slug: "roklya-karolina", title: "Рокля Каролина", category: "Рокли", price: 850, note: "Сценично присъствие", imgStart: 11 }),

  // ─── ПОЛИ (9) ───────────────────────────────────────────────────────────
  make({ slug: "kolektsiya-dve", title: "Колекция Две", category: "Поли", price: 420, note: "Многообразие от текстури", imgStart: 4 }),
  make({ slug: "pola-traditsiya", title: "Пола Традиция", category: "Поли", price: 300, note: "Ръчна бродерия", imgStart: 7 }),
  make({ slug: "pola-mitra", title: "Пола Митра", category: "Поли", price: 280, note: "Класически силует", imgStart: 10 }),
  make({ slug: "pola-silva", title: "Пола Силва", category: "Поли", price: 320, note: "Лек шифон", imgStart: 13 }),
  make({ slug: "pola-aleya", title: "Пола Алея", category: "Поли", price: 240, note: "Ежедневен стил", imgStart: 1 }),
  make({ slug: "pola-selena", title: "Пола Селена", category: "Поли", price: 360, note: "Кадифена текстура", imgStart: 5 }),
  make({ slug: "pola-viola", title: "Пола Виола", category: "Поли", price: 290, note: "Цветни нишки", imgStart: 8 }),
  make({ slug: "pola-orhideya", title: "Пола Орхидея", category: "Поли", price: 410, note: "Воланиран край", imgStart: 12 }),
  make({ slug: "pola-gloriya", title: "Пола Глория", category: "Поли", price: 380, note: "А-силует", imgStart: 15 }),

  // ─── РИЗИ (9) ───────────────────────────────────────────────────────────
  make({ slug: "kolektsiya-kezhual-1", title: "Колекция Кежуал I", category: "Ризи", price: 560, note: "Нови визии в бутиков стил", imgStart: 10 }),
  make({ slug: "riza-leko", title: "Риза Леко", category: "Ризи", price: 150, note: "Модерен крой", imgStart: 11 }),
  make({ slug: "riza-elegans", title: "Риза Елеганс", category: "Ризи", price: 180, note: "Натурални нишки", imgStart: 13 }),
  make({ slug: "riza-balkan", title: "Риза Балкан", category: "Ризи", price: 170, note: "Бродирана яка", imgStart: 2 }),
  make({ slug: "riza-izabela", title: "Риза Изабела", category: "Ризи", price: 195, note: "Дамски крой", imgStart: 6 }),
  make({ slug: "riza-dakota", title: "Риза Дакота", category: "Ризи", price: 165, note: "Oversized стил", imgStart: 9 }),
  make({ slug: "riza-provans", title: "Риза Прованс", category: "Ризи", price: 210, note: "Лен и памук", imgStart: 14 }),
  make({ slug: "riza-severina", title: "Риза Северина", category: "Ризи", price: 185, note: "Дълъг ръкав", imgStart: 3 }),
  make({ slug: "riza-mila", title: "Риза Мила", category: "Ризи", price: 155, note: "Класическа бяла", imgStart: 7 }),

  // ─── ТОПОВЕ (9) ─────────────────────────────────────────────────────────
  make({ slug: "kolektsiya-tri", title: "Колекция Три", category: "Топове", price: 980, note: "Ексклузивни детайли", imgStart: 7 }),
  make({ slug: "kolektsiya-kezhual-2", title: "Колекция Кежуал II", category: "Топове", price: 610, note: "Съвременен силует", imgStart: 13 }),
  make({ slug: "top-fina", title: "Топ Фина", category: "Топове", price: 130, note: "Копринен", imgStart: 10 }),
  make({ slug: "top-venetsiya", title: "Топ Венеция", category: "Топове", price: 180, note: "Дантелен детайл", imgStart: 1 }),
  make({ slug: "top-atina", title: "Топ Атина", category: "Топове", price: 160, note: "Драпиран", imgStart: 4 }),
  make({ slug: "top-kasandra", title: "Топ Касандра", category: "Топове", price: 220, note: "Ръчна бродерия", imgStart: 6 }),
  make({ slug: "top-adelina", title: "Топ Аделина", category: "Топове", price: 140, note: "Базов крой", imgStart: 8 }),
  make({ slug: "top-perla", title: "Топ Перла", category: "Топове", price: 200, note: "Седеф акцент", imgStart: 11 }),
  make({ slug: "top-zvezda", title: "Топ Звезда", category: "Топове", price: 170, note: "Сатенен блясък", imgStart: 14 }),

  // ─── САКА (9) ───────────────────────────────────────────────────────────
  make({ slug: "sako-atelie", title: "Сако Ателие", category: "Сака", price: 720, note: "Персонализирана изработка", imgStart: 13 }),
  make({ slug: "sako-grad", title: "Сако Град", category: "Сака", price: 650, note: "Съвременен силует", imgStart: 1 }),
  make({ slug: "sako-viktoriya", title: "Сако Виктория", category: "Сака", price: 690, note: "Двуредно", imgStart: 3 }),
  make({ slug: "sako-moris", title: "Сако Морис", category: "Сака", price: 740, note: "Класически крой", imgStart: 5 }),
  make({ slug: "sako-bordo", title: "Сако Бордо", category: "Сака", price: 670, note: "Бордо акцент", imgStart: 7 }),
  make({ slug: "sako-prima", title: "Сако Прима", category: "Сака", price: 780, note: "Структуриран крой", imgStart: 9 }),
  make({ slug: "sako-kameliya", title: "Сако Камелия", category: "Сака", price: 620, note: "Леко тегло", imgStart: 11 }),
  make({ slug: "sako-zornitsa", title: "Сако Зорница", category: "Сака", price: 710, note: "Кадифено", imgStart: 13 }),
  make({ slug: "sako-artemis", title: "Сако Артемис", category: "Сака", price: 800, note: "Бутикова серия", imgStart: 15 }),

  // ─── АКСЕСОАРИ (9) ──────────────────────────────────────────────────────
  make({ slug: "shal-bordo", title: "Шал Бордо", category: "Аксесоари", price: 60, note: "Копринен", imgStart: 1 }),
  make({ slug: "grivna-rachna", title: "Гривна Ръчна", category: "Аксесоари", price: 80, note: "Медно и кожа", imgStart: 4 }),
  make({ slug: "shapka-magi", title: "Шапка Маги", category: "Аксесоари", price: 90, note: "Вълнена", imgStart: 6 }),
  make({ slug: "kolan-zara", title: "Колан Зара", category: "Аксесоари", price: 70, note: "Естествена кожа", imgStart: 8 }),
  make({ slug: "chanta-loreta", title: "Чанта Лорета", category: "Аксесоари", price: 220, note: "Ръчна изработка", imgStart: 10 }),
  make({ slug: "shal-safrid", title: "Шал Сафрид", category: "Аксесоари", price: 75, note: "Памук и лен", imgStart: 12 }),
  make({ slug: "broshka-viola", title: "Брошка Виола", category: "Аксесоари", price: 50, note: "Метален детайл", imgStart: 14 }),
  make({ slug: "ogarlitsa-selena", title: "Огърлица Селена", category: "Аксесоари", price: 110, note: "Перлен акцент", imgStart: 2 }),
  make({ slug: "grivna-topaz", title: "Гривна Топаз", category: "Аксесоари", price: 95, note: "Камък топаз", imgStart: 5 }),
];

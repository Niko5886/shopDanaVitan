import { defineType, defineField } from "sanity";

// Схема на продукта — огледално на интерфейса Product от data/products.ts.
// ВАЖНО: стойностите на category трябва да съвпадат 1:1 със сегашните в
// products.ts, защото филтърът в /shop сравнява по тях.
// categorySlug НЕ е ръчно поле тук — извежда се автоматично от category
// при четене (карта: Поли→poli, Рокли→rokli, Ризи→rizi, Топове→topove,
// Сака→saka, Аксесоари→aksesoari).

export const product = defineType({
  name: "product",
  title: "Продукт",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Заглавие",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "string",
      options: {
        list: [
          { title: "Поли", value: "Поли" },
          { title: "Рокли", value: "Рокли" },
          { title: "Ризи", value: "Ризи" },
          { title: "Сака", value: "Сака" },
          { title: "Топове", value: "Топове" },
          { title: "Аксесоари", value: "Аксесоари" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Цена (лв.)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "note",
      title: "Подзаглавие (кратка бележка)",
      type: "string",
      description: "Краткият сив текст под името на картата (напр. „Лимитирана серия“).",
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
    }),
    defineField({
      name: "order",
      title: "Подредба",
      type: "number",
      description: "Подредба в магазина (по-малко = по-напред). Запазва оригиналния ред.",
    }),
    defineField({
      name: "sizes",
      title: "Размери",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "XS", value: "XS" },
          { title: "S", value: "S" },
          { title: "M", value: "M" },
          { title: "L", value: "L" },
          { title: "XL", value: "XL" },
          { title: "XXL", value: "XXL" },
          { title: "Един размер", value: "Един размер" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "Снимки",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
    },
  },
});

// Малък сървърен компонент, който вмъква structured data (JSON-LD) скрипт.
// Помага на Google да разбира съдържанието → rich results и по-добро
// локално SEO. Виж употреба в app/layout.tsx (Organization/LocalBusiness)
// и app/shop/[slug]/page.tsx (Product).
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Съдържанието е наше (не потребителско) → безопасно за inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

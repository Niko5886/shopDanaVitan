import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import {
  productBySlug,
  relatedProducts,
  allSlugs,
  mapProduct,
  type RawProduct,
} from "../../../sanity/lib/queries";
import ProductDetailClient from "../../../components/ProductDetailClient";
import { isRealProduct } from "../../../data/realProducts";
import JsonLd from "../../../components/JsonLd";
import { SITE_URL, SITE_NAME } from "../../../lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // Само slug-овете от Sanity.
  const slugs = await client.fetch<{ slug: string }[]>(allSlugs);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = await client.fetch<RawProduct | null>(productBySlug, { slug }, { next: { revalidate: 60 } });

  if (!raw) {
    return { title: "Продуктът не е намерен" };
  }
  const product = mapProduct(raw);

  const description = `${product.title} — ${product.category} от Dana Vitan Boutique. ${product.priceLabel}.`;
  const image = product.images[0] ?? product.thumb;

  return {
    title: product.title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.title} | Dana Vitan Boutique`,
      description,
      ...(image ? { images: [{ url: image, alt: product.title }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // Чете от Sanity с ISR (revalidate 60s). БЕЗ SanityLive.
  const raw = await client.fetch<RawProduct | null>(productBySlug, { slug }, { next: { revalidate: 60 } });

  if (!raw) {
    notFound();
  }
  const product = mapProduct(raw);

  // Сходни артикули — същата категория, без текущия, първите 3 (по реда).
  const rawRelated = await client.fetch<RawProduct[]>(
    relatedProducts,
    { category: product.category, slug: product.slug },
    { next: { revalidate: 60 } }
  );
  // Само реални артикули като „сходни" — празните (coming soon) продукти не
  // се показват и не са кликваеми никъде в магазина.
  const related = rawRelated.map(mapProduct).filter((p) => isRealProduct(p.slug));

  return <ProductDetailClient product={product} related={related} />;
}

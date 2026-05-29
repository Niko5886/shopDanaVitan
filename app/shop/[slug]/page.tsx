import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import ProductDetailClient from "../../../components/ProductDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Продуктът не е намерен" };
  }

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
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}

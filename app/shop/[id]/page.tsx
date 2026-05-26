import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import ProductDetailClient from "../../../components/ProductDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
import "./styles.css";
import { ProductType } from "@/types";
import ProductsClient from "@/components/ProductPage";

async function getProducts(): Promise<ProductType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/product`);
  const { analyzedProducts } = await res.json();

  if (!res.ok) throw new Error("Failed to fetch products");

  return analyzedProducts;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsClient products={products} />;
}

export const revalidate = 3600;

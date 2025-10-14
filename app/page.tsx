import ProductList from "./ProductList";
import { fetchProducts } from "@/lib/fetchProducts";

export const revalidate = 3600;

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Product Reviews</h1>
        </header>
        <ProductList products={products} />
      </div>
    </div>
  );
}
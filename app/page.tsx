// app/page.tsx
import ProductList from "./ProductList";
import { fetchProducts } from "@/lib/fetchProducts";

export const revalidate = 3600;

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
              Discover Top-Rated Products
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Honest reviews from real users. Find the perfect product for your
              needs.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductList products={products} />
      </div>
    </div>
  );
}
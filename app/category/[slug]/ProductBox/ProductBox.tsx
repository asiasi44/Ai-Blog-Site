import BlogAnalysis from "@/models/BlogAnalysis";
import ProductCatalog from "./ProductCatalog";

interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  asin: string;
  analysis?: {
    image?: string;
    overall_rating?: number;
    reviewCount?: number;
    price?: string;
  } | null;
}

interface ProductBoxProps {
  products: Product[];
  slug: string;
  initialBrand?: string;
}

export default async function ProductBox({ products, slug, initialBrand }: ProductBoxProps) {
  const asins = products.map((p) => p.asin);
  const blogAnalyses = await BlogAnalysis.find({ asin: { $in: asins } })
    .select("asin image overall_rating reviewCount price")
    .lean();
  const analysisMap = new Map(
    blogAnalyses.map((item) => [
      item.asin,
      {
        image: item.image ? String(item.image) : undefined,
        overall_rating:
          item.overall_rating == null ? undefined : Number(item.overall_rating),
        reviewCount:
          item.reviewCount == null ? undefined : Number(item.reviewCount),
        price: item.price == null ? undefined : String(item.price),
      },
    ]),
  );

  const productsWithAnalysis = products.map((product) => ({
    ...product,
    analysis: analysisMap.get(product.asin) || null,
  }));

  return <ProductCatalog products={productsWithAnalysis} slug={slug} initialBrand={initialBrand} />;
}

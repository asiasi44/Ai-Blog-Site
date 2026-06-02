import dbConnect from "@/lib/mongoose";
import BlogAnalysis from "@/models/BlogAnalysis";
import Category from "@/models/Category";

export async function getProductsByCategory(slug: string) {
  await dbConnect();
  
  const currentCategoryDoc = await Category.findOne({ show: true, slug })
    .select("category features")
    .lean();

  if (!currentCategoryDoc) {
    return { productsByCategory: [], currentCategory: null };
  }

  const currentCategory = {
    ...currentCategoryDoc,
    _id: currentCategoryDoc._id.toString(),
    features: currentCategoryDoc.features?.map((feature: any) => ({
      ...feature,
      _id: feature._id.toString(),
      keywords: Array.isArray(feature.keywords) ? feature.keywords : [],
    })) || []
  };

  const categoryName = currentCategory?.category || "";

  const productsByCategoryRaw = await BlogAnalysis.find({
    category: categoryName,
  }).lean();

  const productsByCategory = productsByCategoryRaw.map((product: any) => ({
    ...product,
    _id: product._id.toString()
  }));

  return { productsByCategory, currentCategory };
}
import dbConnect from "@/lib/mongoose";
import BlogAnalysis from "@/models/BlogAnalysis";
import Category from "@/models/Category";

export async function getProductsByCategory(slug: string) {
  await dbConnect();

  const currentCategoryDoc = await Category.findOne({ slug })
    .select("category features")
    .lean();
  if (!currentCategoryDoc) {
    return { productsByCategory: [], currentCategory: { features: [] } };
  }

  const currentCategory = {
    ...currentCategoryDoc,

    _id: currentCategoryDoc._id.toString(),

    features:
      currentCategoryDoc.features?.map((feature: any) => ({
        ...feature,

        keywords: Array.isArray(feature.keywords) ? feature.keywords : [],
      })) || [],
  };

  const categoryName = currentCategory.category || "";

  const productsByCategoryRaw = await BlogAnalysis.find({
    category: categoryName,
  })

    .select(
      "title price rating category image features overall_rating asin reviewCount slug",
    )

    .lean();

  const productsByCategory = productsByCategoryRaw.map((product: any) => ({
    ...product,

    _id: product._id.toString(),
  }));

  return { productsByCategory, currentCategory };
}

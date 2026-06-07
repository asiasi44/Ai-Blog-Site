import Category from "@/models/Category";
import dbConnect from "@/lib/mongoose";

export async function getCategoriesToShow() {
  await dbConnect();

  const categories = await Category.find({ show: true })
    .select("category")
    .lean();

  return categories.map((c) => ({
    _id: c._id.toString(),
    category: c.category,
  }));
}

import Category from "@/models/Category";
import dbConnect from "@/lib/mongoose";

export async function getCategoriesToShow() {
  await dbConnect();
  const allCategories = await Category.find().select("category");
  return allCategories;
}

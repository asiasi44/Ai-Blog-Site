import BlogAnalysis from "@/models/BlogAnalysis";
import dbConnect from "@/lib/mongoose";

export async function getAllBlogAnalaysis() {
  await dbConnect();
  const blogAnalysis = await BlogAnalysis.find();
  return blogAnalysis;
}

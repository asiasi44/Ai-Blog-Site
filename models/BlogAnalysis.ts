import mongoose from "mongoose";
const { Schema } = mongoose;

const blogAnalysisSchema = new Schema(
  {
    asin: String,
    category: String,
    features: [
      {
        name: String,
        rating: Number,
        verdict: String,
      },
    ],
    final_verdict: String,
    highlights: [String],
    image: String,
    introduction: String,
    overall_rating: Number,
    price: String,
    reviewCount: Number,
    slug: String,
    specifications: [
      {
        name: String,
        value: String,
      },
    ],
    title: String,
    videoStatus: {
      type: String,
      enum: ["idle", "queued", "processing", "generated"],
      default: "idle",
    },
    videoJobId: String,
  },
  { timestamps: true, collection: "blogAnalysis" },
);

const BlogAnalysis =
  mongoose.models.BlogAnalysis ||
  mongoose.model("BlogAnalysis", blogAnalysisSchema);

export default BlogAnalysis;

import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    category: String,
    features: [
      {
        name: String,
        keywords: [String],
      },
    ],
    show: Boolean,
  },
  { timestamps: true },
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;

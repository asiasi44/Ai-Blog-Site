import mongoose, { Model } from "mongoose";

const { Schema } = mongoose;

const generatedArticleSchema = new Schema(
  {
    asin: String,
    slug: String,
    title: String,
    status: String,
    targetKeyword: String,
    youtubeId: String,
    articleData: {
      seo: {
        metaTitle: String,
        metaDescription: String,
        canonicalUrl: String,
      },
      summaryVerdict: String,
      sections: [
        {
          h2Title: String,
          contentMarkdown: String,
        },
      ],
      faqs: [
        {
          question: String,
          answer: String,
        },
      ],
    },
    productMeta: {
      badge: String,
      affiliateUrl: String,
      inStock: Boolean,
      maxRating: Number,
      specs: [{ label: String, value: String }],
      pros: [String],
      cons: [String],
    },
  },
  {
    timestamps: true,
    collection: "generatedArticles",
    strict: false,
  },
);

const GeneratedArticle: Model<any> =
  mongoose.models.GeneratedArticle ||
  mongoose.model("GeneratedArticle", generatedArticleSchema);

export default GeneratedArticle;

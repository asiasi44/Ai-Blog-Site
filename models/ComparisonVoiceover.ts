import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISpec {
  label: string;
  value: string;
  isHighlighted: boolean;
}

export interface IProductDetail {
  name: string;
  rating: number;
  isWinner: boolean;
  badgeText: string;
  specs: ISpec[];
  image: string;
}

export interface ISection {
  title: string;
  durationInSeconds: number;
  isVerdict: boolean;
  productA: IProductDetail;
  productB: IProductDetail;
  voiceover: string;
  audioUrl: string;
}

export interface IComparisonVoiceover extends Document {
  comparison_id: mongoose.Types.ObjectId;
  base_asin: string;
  base_product_id: mongoose.Types.ObjectId;
  compared_asin: string;
  compared_product_id: mongoose.Types.ObjectId;
  sections: ISection[];
  base_product_images: string[];
  compared_product_images: string[];
  renderedAt: Date;
  status: string;
  videoPath: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SpecSchema = new Schema<ISpec>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    isHighlighted: { type: Boolean, default: false },
  },
  { _id: false },
);

const ProductDetailSchema = new Schema<IProductDetail>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    isWinner: { type: Boolean, default: false },
    badgeText: { type: String, required: true },
    specs: [SpecSchema],
    image: { type: String, required: true },
  },
  { _id: false },
);

const SectionSchema = new Schema<ISection>(
  {
    title: { type: String, required: true },
    durationInSeconds: { type: Number, required: true },
    isVerdict: { type: Boolean, default: false },
    productA: ProductDetailSchema,
    productB: ProductDetailSchema,
    voiceover: { type: String, required: true },
    audioUrl: { type: String, required: true },
  },
  { _id: false },
);

const ComparisonVoiceoverSchema = new Schema<IComparisonVoiceover>(
  {
    comparison_id: { type: Schema.Types.ObjectId, required: true },
    base_asin: { type: String, required: true, index: true },
    base_product_id: { type: Schema.Types.ObjectId, required: true },
    compared_asin: { type: String, required: true, index: true },
    compared_product_id: { type: Schema.Types.ObjectId, required: true },
    sections: [SectionSchema],
    base_product_images: [{ type: String }],
    compared_product_images: [{ type: String }],
    renderedAt: { type: Date },
    status: { type: String, required: true },
    videoPath: { type: String },
  },
  {
    timestamps: true,
    // Explicitly target the collection name: comparison_voiceovers
    collection: "comparison_voiceovers",
  },
);

// Create compound index for bidirectional lookup optimization
ComparisonVoiceoverSchema.index({ base_asin: 1, compared_asin: 1 });

const ComparisonVoiceover: Model<IComparisonVoiceover> =
  mongoose.models.ComparisonVoiceover ||
  mongoose.model<IComparisonVoiceover>(
    "ComparisonVoiceover",
    ComparisonVoiceoverSchema,
  );

export default ComparisonVoiceover;

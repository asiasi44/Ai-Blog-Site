import mongoose, { Schema, Model, Document } from "mongoose";

export interface IComparison extends Document {
  base_product: mongoose.Types.ObjectId;
  compared_product: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const comparisonSchema = new Schema<IComparison>(
  {
    base_product: {
      type: Schema.Types.ObjectId,
      ref: "AllProduct",
      required: true,
      index: true,
    },
    compared_product: {
      type: Schema.Types.ObjectId,
      ref: "AllProduct",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Prevent re-compilation in development (Hot Reload)
const Comparison: Model<IComparison> =
  mongoose.models.Comparison ||
  mongoose.model<IComparison>("Comparison", comparisonSchema);

export default Comparison;

import { UTMSource } from "@/app/subscribe-to-newsletter/types";
import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    source: {
      type: String,
    },
    campaign: {
      type: String,
    },
  },
  { timestamps: true },
);

const Subscriber =
  mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;

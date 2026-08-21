import mongoose, { Model } from "mongoose";

const { Schema } = mongoose;

const allProductSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    brand: String,


    parent_id: {
      type: String,
      default: null,
      index: true,
    },


    root_id: {
      type: String,
      required: true,
      index: true,
    },


    depth: {
      type: Number,
      default: 0,
    },


    asin: {
      type: String,
      default: null,
    },


    asin_confidence: {
      type: Number,
      default: 0,
    },


    asin_match_reasoning: String,


    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },


    opportunity_score: {
      type: Number,
      default: 0,
    },


    /*
      Content generation pipeline
    */
    pipeline: {

      stage: {
        type: String,
        enum: [
          "DISCOVERED",
          "CRAWL",
          "CALCULATE_OPPORTUNITY",
          "KEYWORD",
          "ANALYSIS",
          "SCRIPT_GENERATION",
          "VIDEO_GENERATION",
          "METADATA_GENERATION",
          "UPLOAD_YOUTUBE",
          "PUBLISHED",
        ],
        default: "DISCOVERED",
      },


      status: {
        type: String,
        enum: [
          "WAITING",
          "QUEUED",
          "RUNNING",
          "FAILED",
          "COMPLETED",
        ],
        default: "WAITING",
      },

    },


    /*
      Content already generated
    */
    content: {

      review_video: {

        status: {
          type: String,
          enum:[
            "NOT_CREATED",
            "PROCESSING",
            "PUBLISHED"
          ],
          default:"NOT_CREATED"
        },

        youtube_id:String,

      },


      blog_post: {

        status:{
          type:String,
          default:"NOT_CREATED"
        },

        url:String,

      },

    },


    blogAnalysis: {
      type: Schema.Types.ObjectId,
      ref: "BlogAnalysis",
    },

  },
  { timestamps: true }
);


const AllProduct: Model<any> =
  mongoose.models.AllProduct ||
  mongoose.model("AllProduct", allProductSchema);


export default AllProduct;
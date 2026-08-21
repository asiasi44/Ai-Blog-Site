// models/ClickLog.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClickLog extends Document {
  slug: string;
  asin?: string;
  refSource: string;   // 'youtube', 'pinterest', 'direct'
  videoId?: string;    // e.g. 'v1_soundbar_review'
  visitorId?: string;  // Persistent cookie UUID
  country: string;     // Defaults to 'Unknown'
  userAgent: string;   // Defaults to 'Unknown'
  ip: string;          // Defaults to '127.0.0.1'
  timestamp: Date;
}

const ClickLogSchema: Schema = new Schema<IClickLog>({
  slug: { 
    type: String, 
    required: true, 
    index: true 
  },
  asin: { 
    type: String 
  },
  refSource: { 
    type: String, 
    required: true, 
    default: 'direct' 
  },
  videoId: { 
    type: String, 
    default: null, 
    index: true 
  },
  visitorId: { 
    type: String, 
    default: null, 
    index: true 
  },
  country: { 
    type: String, 
    default: 'Unknown' 
  },
  userAgent: { 
    type: String, 
    default: 'Unknown' 
  },
  ip: { 
    type: String, 
    default: '127.0.0.1' 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
});

export const ClickLog: Model<IClickLog> =
  mongoose.models.ClickLog || mongoose.model<IClickLog>('ClickLog', ClickLogSchema);
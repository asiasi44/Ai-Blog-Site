import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in .env.local'
  );
}

/**
 * Cached connection interface to persist across hot reloads in development
 * and across serverless function invocations in production.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/* Use a global variable so the value is preserved across module reloads
   caused by HMR (Hot Module Replacement) in development. */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

const clientOptions: mongoose.ConnectOptions = {
  dbName: process.env.MONGODB_DB_NAME, // optional: override DB from URI
  bufferCommands: false,               // fail fast instead of queuing
  maxPoolSize: 10,                     // default connection pool
  serverSelectionTimeoutMS: 5_000,     // give up selecting a server after 5 s
  socketTimeoutMS: 45_000,             // close sockets inactive for 45 s
};

/**
 * Returns a cached Mongoose connection, creating one if it doesn't exist.
 *
 * Usage:
 *   import dbConnect from "@/lib/mongoose";
 *   await dbConnect();
 */
export async function dbConnect(): Promise<Mongoose> {
  // Return existing connection immediately
  if (cached.conn) {
    return cached.conn;
  }

  // Reuse an in-flight connection promise (handles concurrent calls)
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, clientOptions)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected");
        return mongooseInstance;
      })
      .catch((err) => {
        // Reset so the next call can retry
        cached.promise = null;
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

/**
 * Gracefully closes the cached connection.
 * Useful in scripts / teardown logic; not needed in normal API routes.
 */
export async function dbDisconnect(): Promise<void> {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("🔌 MongoDB disconnected");
  }
}

export default dbConnect;
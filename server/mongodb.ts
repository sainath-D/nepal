import { MongoClient, Db, ObjectId } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToMongoDB(): Promise<Db> {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  });
  
  try {
    await client.connect();
    db = client.db();
    console.log("✅ Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function getDb(): Promise<Db> {
  if (!db) {
    return connectToMongoDB();
  }
  return db;
}

export function toObjectId(id: string): ObjectId | null {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

export function generateId(): string {
  return new ObjectId().toHexString();
}

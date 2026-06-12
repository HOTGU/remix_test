import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL!);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // 핫리로드 대응 (중복 연결 방지)
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.DB_NAME);
}

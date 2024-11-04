import { MongoClient } from "mongodb";

export async function connectToDatabase(): Promise<MongoClient> {
  const client = await MongoClient.connect(process.env.MONG0_URL as string);

  return client;
}

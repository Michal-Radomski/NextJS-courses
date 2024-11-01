import { Db, InsertOneResult, MongoClient, Sort, WithId } from "mongodb";

export async function connectDatabase(): Promise<MongoClient> {
  const client: MongoClient = await MongoClient.connect(process.env.MONG0_URL as string);

  return client;
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: CommentI
): Promise<InsertOneResult<Document>> {
  const db: Db = client.db();

  const result: InsertOneResult<Document> = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(
  client: MongoClient,
  collection: string,
  sort: Sort,
  filter = {}
): Promise<WithId<Document>[]> {
  const db: Db = client.db();

  const documents = (await db.collection(collection).find(filter).sort(sort).toArray()) as WithId<Document>[];

  return documents;
}

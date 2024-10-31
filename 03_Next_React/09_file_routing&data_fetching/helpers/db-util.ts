import { Db, InsertOneResult, MongoClient, WithId } from "mongodb";

export async function connectDatabase(): Promise<MongoClient> {
  const client: MongoClient = await MongoClient.connect(
    "mongodb+srv://maximilian:8ZO3ycZqJ23kWBQx@cluster0.ntrwp.mongodb.net/events?retryWrites=true&w=majority"
  );

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
  sort: { id: any }
): Promise<WithId<Document>[]> {
  const db: Db = client.db();

  const documents = (await db.collection(collection).find().sort(sort).toArray()) as WithId<Document>[];

  return documents;
}

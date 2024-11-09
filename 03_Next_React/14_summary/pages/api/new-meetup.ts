import type { NextApiRequest, NextApiResponse } from "next";
import { Collection, Db, InsertOneResult, MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "POST") {
    const data = req.body;

    const client = (await MongoClient.connect(process.env.MONG0_URL as string)) as MongoClient;
    const db: Db = client.db();

    const meetupsCollection: Collection<Document> = db.collection("meetups");

    const result: InsertOneResult<Document> = await meetupsCollection.insertOne(data);
    // console.log("result:", result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;

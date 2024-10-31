import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, WithId } from "mongodb";

import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-util";

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const eventId = req.query.eventId as string;

  let client;

  try {
    client = (await connectDatabase()) as MongoClient;
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    } as CommentI;

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = (await getAllDocuments(client, "comments", { _id: -1 } as any)) as WithId<Document>[];
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }

  client.close();
}

export default handler;

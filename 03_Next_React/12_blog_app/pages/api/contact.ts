import { NextApiRequest, NextApiResponse } from "next";
import { Db, InsertOneResult, MongoClient, ObjectId } from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "POST") {
    const { email, name, message } = req.body as Contact;

    if (!email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    } as Contact;

    let client;

    try {
      client = (await MongoClient.connect(process.env.MONG0_URL as string)) as MongoClient; //* Only on server-side!
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db: Db = client.db();

    try {
      const result: InsertOneResult<Document> = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId as ObjectId;
    } catch (error) {
      console.log("error:", error);
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res.status(201).json({ message: "Successfully stored message!", contact: newMessage });
  }
}

export default handler;

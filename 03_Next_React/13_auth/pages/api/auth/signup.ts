import type { NextApiRequest, NextApiResponse } from "next";
import { Db, InsertOneResult, MongoClient, WithId } from "mongodb";

import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse<Auth>): Promise<void> {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  if (!email || !email.includes("@") || !password || password.trim().length < 7) {
    res.status(422).json({
      message: "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const client: MongoClient = await connectToDatabase();

  const db: Db = client.db();

  const existingUser = (await db.collection("users").findOne({ email: email })) as WithId<Document>;

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  const hashedPassword: string = await hashPassword(password);

  const result = (await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  })) as InsertOneResult<Document>;

  res.status(201).json({ message: "Created user!", ...result });
  client.close();
}

export default handler;

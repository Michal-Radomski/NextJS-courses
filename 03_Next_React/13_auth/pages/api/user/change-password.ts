import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { Collection, MongoClient, WithId } from "mongodb";

import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  // console.log("session:", session);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user?.email as string;
  const oldPassword = req.body.oldPassword as string;
  const newPassword = req.body.newPassword as string;

  const client: MongoClient = await connectToDatabase();

  const usersCollection = client.db().collection("users") as Collection<Document>;

  const user = (await usersCollection.findOne({ email: userEmail })) as WithId<Document>;

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } });
  console.log("result:", result);

  client.close();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;

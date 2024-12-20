import NextAuth, { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Collection, MongoClient } from "mongodb";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials: { email: string; password: string }): Promise<Awaitable<User>> {
        // console.log("credentials:", credentials);

        const client: MongoClient = await connectToDatabase();

        const usersCollection: Collection<Document> = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials!.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid: boolean = await verifyPassword(credentials!.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        // Return user;
        return { email: user.email } as Awaitable<User>;
      },
    }),
  ],
};

export default NextAuth(authOptions);

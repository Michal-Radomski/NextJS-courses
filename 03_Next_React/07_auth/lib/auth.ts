import { cookies } from "next/headers";
import { Cookie, Lucia, Session } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

import db from "./db";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId: number): Promise<void> {
  const session: Session = await lucia.createSession(String(userId), {});
  const sessionCookie: Cookie = lucia.createSessionCookie(session.id);
  console.log({ session, sessionCookie });

  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

import { cookies } from "next/headers";
import { Cookie, Lucia, Session, User } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

import db from "./db";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

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
// console.log("lucia:", lucia);

export async function createAuthSession(userId: number): Promise<void> {
  const session: Session = await lucia.createSession(String(userId), {});
  const sessionCookie: Cookie = lucia.createSessionCookie(session.id);
  // console.log({ session, sessionCookie });

  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function verifyAuth(): Promise<
  | {
      user: User;
      session: Session;
    }
  | {
      user: null;
      session: null;
    }
> {
  const sessionCookie = cookies().get(lucia.sessionCookieName) as RequestCookie;

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch (error) {
    console.log("error:", error);
  }

  return result;
}

export async function destroySession(): Promise<void | { error: string }> {
  const { session } = (await verifyAuth()) as { session: Session };
  if (!session) {
    return {
      error: "Unauthorized!",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie: Cookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

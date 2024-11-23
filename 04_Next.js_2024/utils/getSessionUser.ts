import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";

import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: (session.user as UserI).id as string,
  };
};

"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function getUnreadMessageCount(): Promise<{ error?: string; count?: number }> {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: "User ID is required" };
  }

  const { userId }: { userId: string } = sessionUser;

  const count: number = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
}

export default getUnreadMessageCount;

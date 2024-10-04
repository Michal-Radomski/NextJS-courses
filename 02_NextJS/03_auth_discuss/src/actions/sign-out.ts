"use server";

import * as auth from "@/auth";

export async function signOut(): Promise<void> {
  return auth.signOut();
}

"use server";

import * as auth from "@/auth";

export async function signIn(): Promise<void> {
  return auth.signIn("github");
}
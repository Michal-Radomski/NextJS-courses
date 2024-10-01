"use server";

import { redirect } from "next/navigation";

import { db } from "@/db";

export async function editSnippet(id: number, code: string): Promise<void> {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

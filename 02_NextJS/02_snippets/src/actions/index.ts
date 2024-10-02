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

export async function deleteSnippet(id: number): Promise<void> {
  await db.snippet.delete({
    where: { id },
  });

  redirect("/");
}

export async function createSnippet(_formState: { message: string }, formData: FormData): Promise<{ message: string }> {
  try {
    // Check the user's inputs and make sure they're valid
    const title = formData.get("title") as FormDataEntryValue | string;
    const code = formData.get("code") as FormDataEntryValue | string;

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer",
      };
    }
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer",
      };
    }

    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }

  // Redirect the user back to the root route
  redirect("/");
}

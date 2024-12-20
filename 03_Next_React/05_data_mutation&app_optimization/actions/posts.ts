"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { uploadImage } from "@/lib/cloudinary";

export async function createPost(
  _prevState: FormData,
  formData: FormData
): Promise<{
  errors: string[];
}> {
  const title = formData.get("title") as string;
  const image = formData.get("image") as File;
  const content = formData.get("content") as string;

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required.");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required.");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl: string;

  try {
    imageUrl = (await uploadImage(image)) as string;
  } catch (error) {
    throw new Error("Image upload failed, post was not created. Please try again later.");
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });

  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId: string): Promise<void> {
  await updatePostLikeStatus(postId, 2 as any);
  revalidatePath("/", "layout");
}

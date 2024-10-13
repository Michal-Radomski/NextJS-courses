"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { saveMeal } from "./meals";

function isInvalidText(text: string): boolean {
  return !text || text.trim() === "";
}

//* Server Actions
export async function shareMeal(
  _prevState: any,
  formData: FormData
): Promise<{
  message: string;
}> {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  } as Meal;

  if (
    isInvalidText(meal.title as string) ||
    isInvalidText(meal.summary as string) ||
    isInvalidText(meal.instructions as string) ||
    isInvalidText(meal.creator as string) ||
    isInvalidText(meal.creator_email as string) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    (meal.image as File).size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals", "page"); //* Re-validate cache!
  redirect("/meals");
}

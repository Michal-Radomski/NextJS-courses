"use server";

import cloudinary from "@/config/cloudinary";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId: string): Promise<void> {
  const sessionUser = await getSessionUser();

  // Check for session
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser as { userId: string };

  await connectDB();

  const property = (await Property.findById(propertyId)) as PropertyI;

  if (!property) throw new Error("Property Not Found");

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // extract public id's from image url in DB
  const publicIds = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split("/");
    return parts.at(-1)?.split(".").at(0);
  }) as string[];

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }

  // Proceed with property deletion
  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;

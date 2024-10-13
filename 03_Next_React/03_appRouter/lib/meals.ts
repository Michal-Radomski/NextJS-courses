import fs from "fs";
import sql, { Database } from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db: Database = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}

export function getMeal(slug: string): Meal {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal;
}

export async function saveMeal(meal: Meal): Promise<void> {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = (meal.image as File).name.split(".").pop() as string;
  const fileName: string = `${meal.slug}.${extension}`;

  const stream: fs.WriteStream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage: ArrayBuffer = await (meal.image as File).arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}

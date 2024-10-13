import Image from "next/image";
import { notFound } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { getMeal } from "@/lib/meals";
import classes from "./page.module.scss";

export async function generateMetadata({ params }: { params: Params }): Promise<{
  title: string;
  description: string;
}> {
  const meal = getMeal(params.mealSlug) as Meal;

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }: { params: Params | { mealSlug: string } }): JSX.Element {
  // console.log("params:", params);

  const meal = getMeal(params.mealSlug) as Meal;
  // console.log("meal:", meal);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />") as string;

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image as string} alt={meal.title} fill={true} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions, //* But way!
          }}
        ></p>
      </main>
    </>
  );
}

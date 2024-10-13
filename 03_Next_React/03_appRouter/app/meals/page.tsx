import React from "react";
import Link from "next/link";

import classes from "./page.module.scss";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

async function Meals(): Promise<JSX.Element> {
  const meals = (await getMeals()) as Meal[];

  return <MealsGrid meals={meals} />;
}

export default function MealsPage(): JSX.Element {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <React.Suspense fallback={<p className={classes.loading}>Fetching meals (suspense)...</p>}>
          <Meals />
        </React.Suspense>
      </main>
    </>
  );
}

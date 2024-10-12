import MealItem from "./meal-item";
import classes from "./meals-grid.module.scss";

export default function MealsGrid({ meals }: { meals: Meal[] }): JSX.Element {
  return (
    <ul className={classes.meals}>
      {meals.map((meal: Meal) => (
        <li key={meal.id}>
          <MealItem {...(meal as Meal)} />
        </li>
      ))}
    </ul>
  );
}

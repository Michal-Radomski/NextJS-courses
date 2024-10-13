import classes from "./loading.module.scss";

export default function MealsLoadingPage(): JSX.Element {
  return <p className={classes.loading}>Fetching meals loader...</p>;
}

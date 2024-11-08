import classes from "./Card.module.scss";

function Card(props: { children: React.ReactNode }): JSX.Element {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;

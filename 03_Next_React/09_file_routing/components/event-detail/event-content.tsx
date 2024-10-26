import classes from "./event-content.module.scss";

function EventContent(props: { children: React.ReactNode }): JSX.Element {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;

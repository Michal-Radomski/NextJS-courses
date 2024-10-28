import classes from "./event-summary.module.scss";

function EventSummary(props: { title: string }): JSX.Element {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;

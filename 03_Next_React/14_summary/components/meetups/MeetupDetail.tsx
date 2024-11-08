import classes from "./MeetupDetail.module.scss";

function MeetupDetail(props: MeetUp): JSX.Element {
  return (
    <section className={classes.detail}>
      <img src={props.image as string} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;

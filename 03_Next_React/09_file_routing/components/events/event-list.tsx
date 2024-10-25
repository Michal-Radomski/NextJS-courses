import EventItem from "./event-item";
import classes from "./event-list.module.scss";
// console.log("classes:", classes);

function EventList(props: { items: EventI[] }): JSX.Element {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map(
        (event: EventI): JSX.Element => (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            location={event.location}
            date={event.date}
            image={event.image}
          />
        )
      )}
    </ul>
  );
}

export default EventList;

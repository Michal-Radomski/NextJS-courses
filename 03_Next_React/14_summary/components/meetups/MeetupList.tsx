import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.scss";

function MeetupList(props: { meetups: MeetUp[] }): JSX.Element {
  return (
    <ul className={classes.list}>
      {props.meetups.map(
        (meetup: MeetUp): JSX.Element => (
          <MeetupItem key={meetup.id} id={meetup.id} image={meetup.image} title={meetup.title} address={meetup.address} />
        )
      )}
    </ul>
  );
}

export default MeetupList;

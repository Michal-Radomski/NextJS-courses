import React from "react";
// import { useRouter } from "next/router";

// import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const EventDetailPage = (props: { selectedEvent: EventI }): JSX.Element => {
  // const router = useRouter();
  // const eventId = router.query.eventId as string;
  // const event: EventI = getEventById(eventId);

  const event: EventI = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <React.Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </React.Fragment>
  );
};

export async function getStaticProps(context: { params: { eventId: string } }): Promise<any> {
  const eventId = context.params.eventId;

  const event: EventI = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths(): Promise<any> {
  const events: EventI[] = await getFeaturedEvents();

  const paths = events.map((event: EventI) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;

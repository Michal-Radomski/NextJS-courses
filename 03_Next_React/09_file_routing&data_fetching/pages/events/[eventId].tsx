import React from "react";
// import { useRouter } from "next/router";
import Head from "next/head";

// import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
// import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import Comments from "../../components/input/comments";

const EventDetailPage = (props: { selectedEvent: EventI }): JSX.Element => {
  // const router = useRouter();
  // const eventId = router.query.eventId as string;
  // const event: EventI = getEventById(eventId);

  const event: EventI = props?.selectedEvent;

  if (!event) {
    return (
      // <ErrorAlert>
      //   <p>No event found!</p>
      // </ErrorAlert>
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>

      <EventSummary title={event?.title} />
      <EventLogistics date={event?.date} address={event?.location} image={event?.image} imageAlt={event?.title} />
      <EventContent>
        <p>{event?.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </React.Fragment>
  );
};

export async function getStaticProps(context: { params: { eventId: string } }): Promise<any> {
  const eventId: string = context?.params?.eventId;
  const event: EventI = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
    notFound: Boolean(!event ? true : false),
  };
}

export async function getStaticPaths(): Promise<any> {
  const events: EventI[] = await getFeaturedEvents();
  const paths = events?.map((event: EventI) => ({ params: { eventId: event?.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;

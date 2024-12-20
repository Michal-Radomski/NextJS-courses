import React from "react";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";

import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
// import { getAllEvents } from "@/dummy-data";
import { getAllEvents } from "../../helpers/api-util";

const AllEventsPage = (props: { events: EventI[] }): JSX.Element => {
  const router: NextRouter = useRouter();

  // const events: EventI[] = getAllEvents();
  const { events } = props;

  function findEventsHandler(year: string, month: string): void {
    const fullPath: string = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <React.Fragment>
      {/* //* Next.js merges tags in the head */}
      {/* <Head>
        <title>All my events</title>
      </Head> */}
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </React.Fragment>
  );
};

export async function getStaticProps(): Promise<any> {
  const events: EventI[] = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;

import React from "react";
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

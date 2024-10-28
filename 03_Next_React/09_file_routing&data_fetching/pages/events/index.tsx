import React from "react";
import { NextRouter, useRouter } from "next/router";

import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";

const AllEventsPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const events: EventI[] = getAllEvents();

  function findEventsHandler(year: string, month: string): void {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <React.Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </React.Fragment>
  );
};

export default AllEventsPage;

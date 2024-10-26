import React from "react";
import { NextRouter, useRouter } from "next/router";

import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = (): JSX.Element => {
  const router: NextRouter = useRouter();

  const filterData = router.query.slug as string[];
  // console.log("filterData:", filterData);

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear: string = filterData[0];
  const filteredMonth: string = filterData[1];

  const numYear: number = +filteredYear;
  const numMonth: number = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return (
      <React.Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </React.Fragment>
    );
  }

  const filteredEvents: EventI[] = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <React.Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </React.Fragment>
    );
  }

  const date: Date = new Date(numYear, numMonth - 1);

  return (
    <React.Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </React.Fragment>
  );
};

export default FilteredEventsPage;

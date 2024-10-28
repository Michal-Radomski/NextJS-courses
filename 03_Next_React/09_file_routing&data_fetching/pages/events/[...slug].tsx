import React from "react";
import { NextRouter, useRouter } from "next/router";
import useSWR from "swr";

// import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

//* V2 - doesn't work - CORS - Browser blocks!
function FilteredEventsPage(): JSX.Element {
  const [loadedEvents, setLoadedEvents] = React.useState<EventI[]>();
  const router: NextRouter = useRouter();

  const filterData = router.query.slug as string[];

  const { data, error }: { data: { data: EventI[] }; error: Error | undefined } = useSWR(
    "http://127.0.0.1:8080/dummy-data.json",
    (url) => fetch(url).then((res: Response) => res.json())
  );

  React.useEffect(() => {
    if (data) {
      const events = [] as EventI[];
      events.push(...data?.data);
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear: string = filterData[0];
  const filteredMonth: string = filterData[1];

  const numYear: number = +filteredYear;
  const numMonth: number = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
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

  const filteredEvents: EventI[] = loadedEvents.filter((event: EventI) => {
    const eventDate: Date = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
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
}

//* V1
// const FilteredEventsPage = (): JSX.Element => {
//   const router: NextRouter = useRouter();

//   const filterData = router.query.slug as string[];
//   // console.log("filterData:", filterData);

//   if (!filterData) {
//     return <p className="center">Loading...</p>;
//   }

//   const filteredYear: string = filterData[0];
//   const filteredMonth: string = filterData[1];

//   const numYear: number = +filteredYear;
//   const numMonth: number = +filteredMonth;

//   if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//     return (
//       <React.Fragment>
//         <ErrorAlert>
//           <p>Invalid filter. Please adjust your values!</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show All Events</Button>
//         </div>
//       </React.Fragment>
//     );
//   }

//   const filteredEvents: EventI[] = getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   if (!filteredEvents || filteredEvents.length === 0) {
//     return (
//       <React.Fragment>
//         <ErrorAlert>
//           <p>No events found for the chosen filter!</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show All Events</Button>
//         </div>
//       </React.Fragment>
//     );
//   }

//   const date: Date = new Date(numYear, numMonth - 1);

//   return (
//     <React.Fragment>
//       <ResultsTitle date={date} />
//       <EventList items={filteredEvents} />
//     </React.Fragment>
//   );
// };

export default FilteredEventsPage;

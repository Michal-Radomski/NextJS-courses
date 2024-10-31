import Head from "next/head";

import EventList from "@/components/events/event-list";
// import { getFeaturedEvents } from "@/dummy-data";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";

export default function HomePage(props: { events: EventI[] }): JSX.Element {
  // const featuredEvents: EventI[] = getFeaturedEvents();
  return (
    // <div>
    //   {/* <EventList items={featuredEvents} /> */}
    //   <EventList items={props.events} />
    // </div>

    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps(): Promise<any> {
  const featuredEvents: EventI[] = await getFeaturedEvents();
  // console.log("featuredEvents:", featuredEvents);

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

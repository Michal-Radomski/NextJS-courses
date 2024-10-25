import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/dummy-data";

export default function HomePage(): JSX.Element {
  const featuredEvents: EventI[] = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

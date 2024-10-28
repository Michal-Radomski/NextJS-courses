export async function getAllEvents(): Promise<EventI[]> {
  // const response: Response = await fetch(process.env.FIREBASE_URL as string);
  // const data = await response.json();

  // const events = [] as EventI[];

  // for (const key in data) {
  //   events.push({
  //     id: key,
  //     ...data[key],
  //   });
  // }

  // return events;

  const response: Response = await fetch("http://127.0.0.1:8080/dummy-data.json");
  const data = (await response.json()) as { data: EventI[] };
  // console.log("data?.data:", data?.data);
  return data?.data;
}

export async function getFeaturedEvents(): Promise<EventI[]> {
  const allEvents = (await getAllEvents()) as EventI[];
  return allEvents.filter((event: EventI) => event.isFeatured);
}

export async function getEventById(id: string): Promise<EventI> {
  const allEvents = (await getAllEvents()) as EventI[];
  return allEvents.find((event: EventI) => event.id === id) as EventI;
}

export async function getFilteredEvents(dateFilter: { year: number; month: number }): Promise<EventI[]> {
  const { year, month } = dateFilter;

  const allEvents = (await getAllEvents()) as EventI[];

  const filteredEvents: EventI[] = allEvents.filter((event: EventI) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

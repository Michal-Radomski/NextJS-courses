// import { unstable_noStore } from 'next/cache';

import Messages from "@/components/messages";
import { getMessages } from "@/lib/messages";

// export const revalidate = 5; //* Every 5s
// export const dynamic = 'force-dynamic'; //* default: "auto", "force-static"

export default async function MessagesPage(): Promise<JSX.Element> {
  // unstable_noStore();
  // const response = await fetch("http://localhost:8080/messages", {
  //   cache: "no-store", //* "no-cache"
  //   next: {
  //     // revalidate:revalidate,
  //     tags: ["msg"],
  //   },
  // });
  // const messages = await response.json() as Message[];

  const messages = (await getMessages()) as Message[];

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}

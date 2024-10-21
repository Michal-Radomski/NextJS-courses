import { getMessages } from "@/lib/messages";

export default async function MessagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  // const response = await fetch("http://localhost:8080/messages", {
  //   headers: {
  //     "X-ID": "layout",
  //   },
  // });
  // const response = await fetch('http://localhost:8080/messages');
  // const messages = await response.json();

  const messages = (await getMessages()) as Message[];
  const totalMessages = messages.length;

  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
}

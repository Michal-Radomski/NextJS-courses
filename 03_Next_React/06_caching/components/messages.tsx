export default function Messages({ messages }: { messages: Message[] }): JSX.Element {
  return (
    <ul className="messages">
      {messages.map((message: Message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}

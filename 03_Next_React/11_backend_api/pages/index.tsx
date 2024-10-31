import React from "react";

function HomePage(): JSX.Element {
  const [feedbackItems, setFeedbackItems] = React.useState<Feedback[]>([]);

  const emailInputRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);
  const feedbackInputRef: React.RefObject<HTMLTextAreaElement> = React.useRef<HTMLTextAreaElement>(null);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value as string;
    const enteredFeedback = feedbackInputRef.current?.value as string;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: Response) => response.json())
      .then((data) => console.log("data:", data))
      .catch((err) => console.log("err:", err));
  }

  function loadFeedbackHandler(): void {
    fetch("/api/feedback")
      .then((response: Response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback as Feedback[]);
      })
      .catch((err) => console.log("err:", err));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map(
          (item: Feedback): JSX.Element => (
            <li key={item.id as string}>{item.text}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default HomePage;

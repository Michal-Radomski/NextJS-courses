import React from "react";

import classes from "./contact-form.module.scss";
import Notification from "../ui/notification";

async function sendContactData(contactDetails: Contact): Promise<void> {
  const response: Response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json()) as Contact;

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

function ContactForm(): JSX.Element {
  const [enteredEmail, setEnteredEmail] = React.useState<string>("");
  const [enteredName, setEnteredName] = React.useState<string>("");
  const [enteredMessage, setEnteredMessage] = React.useState<string>("");
  const [requestStatus, setRequestStatus] = React.useState<Status | null>(null); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer: NodeJS.Timeout = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    // Optional: add client-side validation

    setRequestStatus("pending" as Status);

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success" as Status);
      setEnteredMessage("");
      setEnteredEmail("");
      setEnteredName("");
    } catch (error) {
      if (error instanceof Error) {
        setRequestError(error.message);
        setRequestStatus("error" as Status);
      }
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending" as Status,
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success" as Status,
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error" as Status,
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification ? (
        <Notification status={notification.status} title={notification.title} message={notification.message as string} />
      ) : null}
    </section>
  );
}

export default ContactForm;

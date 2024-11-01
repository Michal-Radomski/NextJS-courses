import React from "react";

import classes from "./newsletter-registration.module.scss";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration(): JSX.Element {
  const emailInputRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  const notificationCtx = React.useContext(NotificationContext);

  function registrationHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value as string;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data): Error => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        console.log("data:", data);
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        console.log("error:", error);
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input type="email" id="email" placeholder="Your email" aria-label="Your email" ref={emailInputRef} />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

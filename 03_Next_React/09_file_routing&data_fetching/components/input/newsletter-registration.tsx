import React from "react";

import classes from "./newsletter-registration.module.scss";

function NewsletterRegistration(): JSX.Element {
  const emailInputRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  function registrationHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value as string;

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: Response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("err:", err));
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

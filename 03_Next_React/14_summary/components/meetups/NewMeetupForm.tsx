import React from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.scss";

function NewMeetupForm(props: { onAddMeetup: (arg0: MeetUp) => void }): JSX.Element {
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const addressInputRef = React.useRef<HTMLInputElement>(null);
  const descriptionInputRef = React.useRef<HTMLTextAreaElement>(null);

  function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const enteredTitle = titleInputRef.current?.value as string;
    const enteredImage = imageInputRef.current?.value as string;
    const enteredAddress = addressInputRef.current?.value as string;
    const enteredDescription = descriptionInputRef.current?.value as string;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    } as MeetUp;

    props.onAddMeetup(meetupData as MeetUp);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea id="description" required rows={5} ref={descriptionInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;

import React from "react";

import classes from "./NewPost.module.scss";

function NewPost({ onCancel, onAddPost }: { onCancel: () => void; onAddPost: (postData: Post) => void }): JSX.Element {
  const [enteredBody, setEnteredBody] = React.useState<string>("");
  const [enteredAuthor, setEnteredAuthor] = React.useState<string>("");

  function bodyChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    setEnteredAuthor(event.target.value);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };
    // console.log("postData:", postData);
    onAddPost(postData);
    onCancel();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={authorChangeHandler} />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}

export default NewPost;

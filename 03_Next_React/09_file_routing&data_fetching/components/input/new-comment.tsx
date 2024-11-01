import React from "react";

import classes from "./new-comment.module.scss";

function NewComment(props: { onAddComment: (commentData: CommentI) => void }): JSX.Element {
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

  const emailInputRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);
  const nameInputRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);
  const commentInputRef: React.RefObject<HTMLTextAreaElement> = React.useRef<HTMLTextAreaElement>(null);

  function sendCommentHandler(event: React.SyntheticEvent): void {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value as string;
    const enteredName = nameInputRef.current?.value as string;
    const enteredComment = commentInputRef.current?.value as string;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default NewComment;

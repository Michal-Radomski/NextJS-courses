import React from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.scss";

function Comments(props: { eventId: string }): JSX.Element {
  const { eventId } = props;

  const [showComments, setShowComments] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<CommentI[]>([]);

  React.useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((response: Response) => response.json())
        .then((data) => {
          setComments(data.comments);
        })
        .catch((err) => console.log("err:", err));
    }
  }, [showComments]);

  function toggleCommentsHandler(): void {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: CommentI): void {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: Response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("err:", err));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments ? <NewComment onAddComment={addCommentHandler} /> : null}
      {showComments ? <CommentList items={comments} /> : null}
    </section>
  );
}

export default Comments;

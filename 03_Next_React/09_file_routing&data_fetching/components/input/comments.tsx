import React from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.scss";
import NotificationContext from "@/store/notification-context";

function Comments(props: { eventId: string }): JSX.Element {
  const { eventId } = props;

  const notificationCtx: NotificationContextI = React.useContext(NotificationContext);

  const [showComments, setShowComments] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<CommentI[]>([]);
  const [isFetchingComments, setIsFetchingComments] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch("/api/comments/" + eventId)
        .then((response: Response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        })
        .catch((err) => console.log("err:", err));
    }
  }, [showComments]);

  function toggleCommentsHandler(): void {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: CommentI): void {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
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
          message: "Your comment was saved!",
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
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments ? <NewComment onAddComment={addCommentHandler} /> : null}
      {showComments && !isFetchingComments ? <CommentList items={comments} /> : null}
      {showComments && isFetchingComments ? <p>Loading...</p> : null}
    </section>
  );
}

export default Comments;

import React from "react";

import Post from "./Post";
import NewPost from "./NewPost";
import classes from "./PostsList.module.scss";
import Modal from "./Modal";

function PostsList({ isPosting, onStopPosting }: { isPosting: boolean; onStopPosting: () => void }): JSX.Element {
  const [posts, setPosts] = React.useState<Post[]>([]);

  function addPostHandler(postData: Post): void {
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post: Post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;

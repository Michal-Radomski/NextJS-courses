import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.scss";

function PostsList(): JSX.Element {
  return (
    <>
      <NewPost />
      <ul className={classes.posts}>
        <Post author="Maximilian" body="React.js is awesome!" />
        <Post author="Manuel" body="Check out the full course!" />
      </ul>
    </>
  );
}

export default PostsList;

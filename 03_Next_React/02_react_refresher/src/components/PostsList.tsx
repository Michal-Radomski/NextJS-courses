import Post from "./Post";
import NewPost from "./NewPost";
import classes from "./PostsList.module.scss";
import Modal from "./Modal";

function PostsList({ isPosting, onStopPosting }: { isPosting: boolean; onStopPosting: () => void }): JSX.Element {
  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author="Manuel" body="Check out the full course!" />
      </ul>
    </>
  );
}

export default PostsList;

import { useLoaderData, Link } from "react-router-dom";

import Modal from "../components/Modal";
import classes from "./PostDetails.module.scss";

function PostDetails(): JSX.Element {
  const post = useLoaderData() as Post;

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

export async function loader({ params }: { params: { postId: string } }): Promise<Post> {
  // console.log("params:", params);
  try {
    const response = await fetch("http://localhost:8080/posts/" + params.postId);
    const resData = await response.json();
    return resData.post as Post;
  } catch (error) {
    console.log("error:", error);
    return null as any;
  }
}

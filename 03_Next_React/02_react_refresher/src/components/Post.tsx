import { Link } from "react-router-dom";

import classes from "./Post.module.scss";

function Post({ id, author, body }: { author: string; body: string; id: string }): JSX.Element {
  return (
    <li className={classes.post}>
      <Link to={id}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </Link>
    </li>
  );
}

export default Post;

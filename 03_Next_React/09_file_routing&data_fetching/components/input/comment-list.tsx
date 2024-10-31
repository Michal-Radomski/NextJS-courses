import classes from "./comment-list.module.scss";

function CommentList(props: { items: CommentI[] }): JSX.Element {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {items.map((item: CommentI) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;

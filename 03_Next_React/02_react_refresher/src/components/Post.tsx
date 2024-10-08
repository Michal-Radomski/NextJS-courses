function Post(props: { author: string; body: string }): JSX.Element {
  return (
    <div className={"post"}>
      <p className={"author"}>{props.author}</p>
      <p className={"text"}>{props.body}</p>
    </div>
  );
}

export default Post;

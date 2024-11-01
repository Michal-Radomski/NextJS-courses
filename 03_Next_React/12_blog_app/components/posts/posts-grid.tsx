import PostItem from "./post-item";
import classes from "./posts-grid.module.scss";

function PostsGrid(props: { posts: Post[] }): JSX.Element {
  const { posts }: { posts: Post[] } = props;

  return (
    <ul className={classes.grid}>
      {posts.map(
        (post: Post): JSX.Element => (
          <PostItem key={post.slug} post={post} />
        )
      )}
    </ul>
  );
}

export default PostsGrid;

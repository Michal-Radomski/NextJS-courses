import classes from "./all-posts.module.scss";
import PostsGrid from "./posts-grid";

function AllPosts(props: { posts: Post[] }): JSX.Element {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;

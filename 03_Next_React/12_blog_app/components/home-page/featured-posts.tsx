import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.scss";

function FeaturedPosts(props: { posts: Post[] }): JSX.Element {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default FeaturedPosts;

import React from "react";
import Head from "next/head";

import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

function AllPostsPage(props: { posts: Post[] }): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all programming-related tutorials and posts!" />
      </Head>
      <AllPosts posts={props.posts} />
    </React.Fragment>
  );
}

export function getStaticProps(): { props: { posts: Post[] } } {
  const allPosts: Post[] = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;

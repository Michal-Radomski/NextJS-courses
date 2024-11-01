import React from "react";
import Head from "next/head";

import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

function HomePage(props: { posts: Post[] }): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>Tux' Blog</title>
        <meta name="description" content="I post about programming and web development." />
      </Head>

      <Hero />
      <FeaturedPosts posts={props.posts} />
    </React.Fragment>
  );
}

export function getStaticProps(): { props: { posts: Post[] } } {
  const featuredPosts = getFeaturedPosts() as Post[];

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;

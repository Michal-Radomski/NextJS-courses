import { Suspense } from "react";
import { Metadata } from "next";

import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";


export const metadata:Metadata = {
  title: 'Latest Posts',
  description: 'Browse our latest posts!'
};

async function LatestPosts(): Promise<JSX.Element> {
  const latestPosts = (await getPosts(2)) as Post[];
  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here's what you might've missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}

import { Metadata } from "next";

import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

// export const metadata: Metadata = {
//   title: "Browse all our X posts.",
//   description: "Browse all our posts.",
// };

export async function generateMetadata(): Promise<Metadata> {
  const posts = (await getPosts()) as Post[];
  const numberOfPosts: number = posts.length;
  return {
    title: `Browse all our ${numberOfPosts} posts.`,
    description: "Browse all our posts.",
  };
}

export default async function FeedPage(): Promise<JSX.Element> {
  const posts = (await getPosts()) as Post[];
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}

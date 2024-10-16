import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

export default async function FeedPage(): Promise<JSX.Element> {
  const posts = (await getPosts()) as Post[];
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}

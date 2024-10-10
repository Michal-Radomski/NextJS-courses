import { promises as fs } from "fs";

import { Post } from "../app";

export async function getStoredPosts(): Promise<Post[]> {
  const rawFileContent = await fs.readFile("api/posts.json", { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  return storedPosts;
}

export function storePosts(posts: Post[]): Promise<void> {
  return fs.writeFile("api/posts.json", JSON.stringify({ posts: posts || [] }));
}

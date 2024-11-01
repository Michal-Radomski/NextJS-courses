import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory: string = path.join(process.cwd(), "posts");

export function getPostsFiles(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string): Post {
  const postSlug: string = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath: string = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent: string = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent) as unknown as { data: Post; content: string };

  const postData = {
    slug: postSlug,
    ...data,
    content,
  } as Post;

  return postData;
}

export function getAllPosts(): Post[] {
  const postFiles: string[] = getPostsFiles();

  const allPosts: Post[] = postFiles.map((postFile: string) => {
    return getPostData(postFile);
  });

  const sortedPosts: Post[] = allPosts.sort((postA: Post, postB: Post) => (postA.date > postB.date ? -1 : 1));

  return sortedPosts;
}

export function getFeaturedPosts(): Post[] {
  const allPosts: Post[] = getAllPosts();

  const featuredPosts: Post[] = allPosts.filter((post: Post) => post.isFeatured);

  return featuredPosts;
}

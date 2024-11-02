import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory: string = path.join(process.cwd() as string, "posts");

export function getPostsFiles(): string[] {
  return fs.readdirSync(postsDirectory, {
    encoding: "utf-8",
    withFileTypes: undefined,
    recursive: false,
  });
}

export function getPostData(postIdentifier: string): Post {
  const postSlug: string = postIdentifier.replace(/\.md$/, ""); // Removes the file extension
  const filePath: string = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent: string = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent) as { data: { [key: string]: string }; content: string };
  // console.log({ data, content });

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

  //* Most recent posts on the top
  const sortedPosts: Post[] = allPosts.sort((postA: Post, postB: Post) => (postA.date! > postB.date! ? -1 : 1));

  return sortedPosts;
}

export function getFeaturedPosts(): Post[] {
  const allPosts: Post[] = getAllPosts();

  const featuredPosts: Post[] = allPosts.filter((post: Post) => post.isFeatured);

  return featuredPosts;
}

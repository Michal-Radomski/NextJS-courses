"use client";

import { useOptimistic } from "react";
import Image, { ImageLoader } from "next/image";

import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/actions/posts";

function imageLoader(config: ObjectI): string {
  // console.log("config:", config);
  const urlStart = (config.src as string).split("upload/")[0];
  const urlEnd = (config.src as string).split("upload/")[1];
  // console.log({ urlStart, urlEnd });
  // const transformations = `w_200,h_150,q_${config.quality}`;
  const transformations = `w_200,q_${config.quality}`; //* Holds w/h ratio
  // console.log({ transformations });
  return `${urlStart}upload/${transformations}/${urlEnd}`;
}

function Post({ post, action }: { post: Post; action: Function }): JSX.Element {
  return (
    <article className="post">
      <div className="post-image">
        {/* <img src={post.image as string} alt={post.title} /> */}
        <Image
          loader={imageLoader as ImageLoader}
          src={post.image as string}
          width={200}
          height={120}
          alt={post.title}
          quality={50}
          fill={false}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on <time dateTime={post.createdAt}>{formatDate(post.createdAt!)}</time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)} className={post.isLiked ? "liked" : ""}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: Post[] }): JSX.Element {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex((post: Post) => post.id === updatedPostId);

    if (updatedPostIndex === -1) {
      return prevPosts;
    }

    const updatedPost = { ...prevPosts[updatedPostIndex] } as Post;
    updatedPost.likes = updatedPost.likes! + (updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts];
    newPosts[updatedPostIndex] = updatedPost;
    return newPosts;
  });

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId: string): Promise<void> {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post: Post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}

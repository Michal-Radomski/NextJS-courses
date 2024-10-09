import express from "express";
import bodyParser from "body-parser";
import { getStoredPosts, storePosts } from "./data/posts";

export interface Post {
  id: string;
  body: string;
  author: string;
}

const app = express();

app.use(bodyParser.json());

app.use((_req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/posts", async (_req, res) => {
  const storedPosts: Post[] = await getStoredPosts();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ posts: storedPosts });
});

app.get("/posts/:id", async (req, res) => {
  const storedPosts: Post[] = await getStoredPosts();
  const post = storedPosts.find((post: Post) => post.id === req.params.id) as Post;
  res.json({ post });
});

app.post("/posts", async (req, res) => {
  const existingPosts: Post[] = await getStoredPosts();
  const postData: Post = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts: Post[] = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: "Stored new post.", post: newPost });
});

app.listen(8080);

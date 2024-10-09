import http from "http";
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

app.use((_req, res, next): void => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/posts", async (_req, res): Promise<void> => {
  const storedPosts: Post[] = await getStoredPosts();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ posts: storedPosts });
});

app.get("/posts/:id", async (req, res): Promise<void> => {
  const storedPosts: Post[] = await getStoredPosts();
  const post = storedPosts.find((post: Post) => post.id === req.params.id) as Post;
  res.json({ post });
});

app.post("/posts", async (req, res): Promise<void> => {
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

const server = http.createServer(app);

const port: number = 8080;

server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

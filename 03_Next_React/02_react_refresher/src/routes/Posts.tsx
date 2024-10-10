import { Outlet } from "react-router-dom";

import PostsList from "../components/PostsList";

function Posts(): JSX.Element {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export async function loader(): Promise<Post[]> {
  try {
    const response = await fetch("http://localhost:8080/posts");
    const resData = await response.json();
    return resData.posts as Post[];
  } catch (error) {
    console.log("error:", error);
    return null as any;
  }
}

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

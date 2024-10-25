import { NextRouter, useRouter } from "next/router";

function BlogPostsPage(): JSX.Element {
  const router: NextRouter = useRouter();

  console.log("router.query:", router.query);

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}

export default BlogPostsPage;

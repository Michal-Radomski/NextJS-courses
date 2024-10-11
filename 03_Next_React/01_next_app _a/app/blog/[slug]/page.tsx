import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function BlogPostPage({ params }: { params: Params }): JSX.Element {
  // console.log({ params });
  return (
    <main>
      <h1>Blog Post</h1>
      {JSON.stringify(params)}
    </main>
  );
}

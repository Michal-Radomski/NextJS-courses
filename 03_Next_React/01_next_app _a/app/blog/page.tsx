import Link from "next/link";

export default function BlogPage(): JSX.Element {
  return (
    <main>
      <h1>BlogPage</h1>
      <p>
        <Link href="/blog/post1">Post 1</Link>
      </p>
      <p>
        <Link href="/blog/post2">Post 2</Link>
      </p>
    </main>
  );
}

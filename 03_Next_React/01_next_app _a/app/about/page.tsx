import Link from "next/link";

export default function AboutPage(): JSX.Element {
  return (
    <main>
      <h1>AboutPage</h1>
      <p>
        <Link href={"/"}>Home</Link>
      </p>
    </main>
  );
}

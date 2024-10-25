import Link from "next/link";

function HomePage(): JSX.Element {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          {/* //* replace - can't go back! */}
          <Link href="/portfolio" replace={false}>
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;

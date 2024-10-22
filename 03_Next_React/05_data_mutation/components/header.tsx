import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/logo.png";
// console.log("logo:", logo);

export default function Header(): JSX.Element {
  return (
    <header id="main-header">
      <Link href="/">
        {/* <img src={logo.src} alt="Mobile phone with posts feed on it" /> */}
        <Image
          src={logo}
          // sizes="10vw"
          width={100}
          height={100}
          priority={true}
          alt="Mobile phone with posts feed on it"
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

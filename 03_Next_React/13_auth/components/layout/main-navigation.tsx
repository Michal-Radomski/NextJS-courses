import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.scss";

function MainNavigation(): JSX.Element {
  const { data: session, status } = useSession();
  // console.log({ status });
  // console.log({ session });

  function logoutHandler(): void {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status !== "loading" ? (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          ) : null}
          {session ? (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          ) : null}
          {session ? (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

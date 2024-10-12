"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./nav-link.module.scss";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }): JSX.Element {
  const path: string = usePathname();

  return (
    <Link href={href} className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}>
      {children}
    </Link>
  );
}

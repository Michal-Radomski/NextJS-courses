import React from "react";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

import HeaderAuth from "@/components/header-auth";
import SearchInput from "./search-input";

export default function Header(): JSX.Element {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <React.Suspense>
            <SearchInput />
          </React.Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}

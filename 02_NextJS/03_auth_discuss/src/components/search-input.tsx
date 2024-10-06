"use client";

import { Input } from "@nextui-org/react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

import * as actions from "@/actions";

export default function SearchInput(): JSX.Element {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  return (
    <form action={actions.search}>
      <Input name="term" defaultValue={searchParams.get("term") || ""} />
    </form>
  );
}

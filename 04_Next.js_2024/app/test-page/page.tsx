"use client";

import React from "react";
import { useRouter, useParams, useSearchParams, ReadonlyURLSearchParams, usePathname } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Params } from "next/dist/server/request/params";

const TestPage = (): JSX.Element => {
  const router: AppRouterInstance = useRouter();
  console.log("router:", router);

  const params: Params = useParams();
  console.log("params:", params);

  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  console.log("searchParams:", searchParams);

  const pathName: string = usePathname();
  console.log("pathName:", pathName);

  return <React.Fragment>TestPage</React.Fragment>;
};

export default TestPage;

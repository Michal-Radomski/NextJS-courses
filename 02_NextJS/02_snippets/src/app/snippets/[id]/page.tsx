import { notFound } from "next/navigation";

import { db } from "@/db";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
  searchParams: {};
}

export default async function SnippetShowPage(props: SnippetShowPageProps): Promise<JSX.Element> {
  // console.log("props:", props);
  const snippet = (await db.snippet.findFirst({
    //  where: { id: Number(props.params.id) },
    where: { id: parseInt(props.params.id) },
  })) as Snippet;

  if (!snippet) {
    return notFound();
  }

  return <div>{snippet.title}</div>;
}

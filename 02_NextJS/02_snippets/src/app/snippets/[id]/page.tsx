import { notFound } from "next/navigation";

import Link from "next/link";
import { db } from "@/db";
import * as actions from "@/actions";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
  searchParams: {};
}

export default async function SnippetShowPage(props: SnippetShowPageProps): Promise<JSX.Element> {
  // console.log("props:", props);
  await new Promise((resolve) => {
    // console.log("r.toString():", r.toString());
    setTimeout(resolve, 1000);
  });

  const snippet = (await db.snippet.findFirst({
    //  where: { id: Number(props.params.id) },
    where: { id: parseInt(props.params.id) },
  })) as Snippet;

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction: () => Promise<void> = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const snippets: Snippet[] = await db.snippet.findMany();

  return snippets.map((snippet: Snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}

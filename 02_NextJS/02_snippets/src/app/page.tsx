import React from "react";
import Link from "next/link";

import { db } from "@/db";

export default async function Home(): Promise<React.JSX.Element> {
  const snippets: Snippet[] = await db.snippet.findMany();

  const renderedSnippets: JSX.Element[] = snippets.map((snippet: Snippet): JSX.Element => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <React.Fragment>
      <div>
        <div className="flex m-2 justify-between items-center">
          <h1 className="text-xl font-bold">Snippets</h1>
          <Link href="/snippets/new" className="border p-2 rounded">
            New
          </Link>
        </div>
        <div className="flex flex-col gap-2">{renderedSnippets}</div>
      </div>
    </React.Fragment>
  );
}

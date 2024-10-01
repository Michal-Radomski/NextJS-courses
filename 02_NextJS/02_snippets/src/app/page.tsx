import React from "react";

import { db } from "@/db";

export default async function Home(): Promise<React.JSX.Element> {
  const snippets: Snippet[] = await db.snippet.findMany();

  const renderedSnippets: JSX.Element[] = snippets.map((snippet: Snippet): JSX.Element => {
    return <div key={snippet.id}>{snippet.title}</div>;
  });

  return (
    <React.Fragment>
      <div>{renderedSnippets}</div>
    </React.Fragment>
  );
}

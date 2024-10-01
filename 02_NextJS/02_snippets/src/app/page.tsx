import React from "react";

import { db } from "@/db";

export default async function Home(): Promise<React.JSX.Element> {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return <div key={snippet.id}>{snippet.title}</div>;
  });

  return (
    <React.Fragment>
      <div>{renderedSnippets}</div>
    </React.Fragment>
  );
}

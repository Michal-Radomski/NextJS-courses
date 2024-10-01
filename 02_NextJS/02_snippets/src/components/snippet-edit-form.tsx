"use client";

import React from "react";
import Editor from "@monaco-editor/react";
import type { Snippet as SnippetPrisma } from "@prisma/client";

interface SnippetEditFormProps {
  snippet: SnippetPrisma | Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps): JSX.Element {
  const [code, setCode] = React.useState<string>(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  return (
    <div>
      <br />
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: true } }}
        onChange={handleEditorChange}
      />
    </div>
  );
}

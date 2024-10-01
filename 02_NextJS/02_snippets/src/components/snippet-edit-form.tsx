"use client";

import React from "react";
import Editor from "@monaco-editor/react";

import type { Snippet as SnippetPrisma } from "@prisma/client";
import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: SnippetPrisma | Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps): JSX.Element {
  const [code, setCode] = React.useState<string>(snippet.code);

  const handleEditorChange = (value: string = ""): void => {
    // console.log("value:", value);
    setCode(value);
  };

  const editSnippetAction: () => Promise<void> = actions.editSnippet.bind(null, snippet.id, code);

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
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}

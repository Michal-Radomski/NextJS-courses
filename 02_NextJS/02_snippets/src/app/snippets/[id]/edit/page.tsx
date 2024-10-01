import { notFound } from "next/navigation";

import { db } from "@/db";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps): Promise<JSX.Element> {
  const id: number = parseInt(props.params.id);
  const snippet = (await db.snippet.findFirst({
    where: { id },
  })) as Snippet;

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}

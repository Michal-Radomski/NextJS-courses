"use client";

import { useFormState } from "react-dom";

import FormSubmit from "@/components/form-submit";

export default function PostForm({ action }: { action: any }): JSX.Element {
  const [state, formAction] = useFormState(action, {} as any);

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required={true} />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image</label>
          <input type="file" accept="image/png, image/jpeg" id="image" name="image" required={true} />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} required={true} />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
        {state.errors && (
          <ul className="form-errors">
            {state.errors.map((error: string) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}

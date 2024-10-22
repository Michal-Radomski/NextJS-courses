"use client";

import { FormStatus, useFormStatus } from "react-dom";

export default function FormSubmit(): JSX.Element {
  const status: FormStatus = useFormStatus();
  // console.log({ status });

  if (status.pending) {
    return <p>Creating post...</p>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}

"use client";

import { useFormStatus } from "react-dom";

export default function MealsFormSubmit(): JSX.Element {
  const { pending }: { pending: boolean } = useFormStatus();

  return <button disabled={pending}>{pending ? "Submitting..." : "Share Meal"}</button>;
}

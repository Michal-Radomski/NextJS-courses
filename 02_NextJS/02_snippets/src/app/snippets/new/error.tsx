"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps): JSX.Element {
  return <div>{error.message}</div>;
}

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js course - about page",
  description: "Next.js course - about page",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <React.Fragment>{children}</React.Fragment>;
}

import type { Metadata } from "next";

import "../globals.scss";

export const metadata: Metadata = {
  title: "Next.js course",
  description: "Next.js course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}

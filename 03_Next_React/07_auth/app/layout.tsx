import { Metadata } from "next";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
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

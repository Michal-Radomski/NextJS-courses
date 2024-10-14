import type { Metadata } from "next";

import "./globals.scss";
import MainHeader from "@/components/main-header";

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
        <div id="page">
          <MainHeader />
          {children}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import localFont from "next/font/local";

import "./globals.css";
import "./globals.scss";

const geistSans: NextFontWithVariable = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono: NextFontWithVariable = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "02_Snippets",
  description: "02_Snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <div className="container mx-auto px-12">{children}</div>
      </body>
    </html>
  );
}

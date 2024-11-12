import type { Metadata } from "next";

import "./styles/globals.css";
import "./styles/globals.scss";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Next Course - Property Pulse",
  description: "Files created during Next.js 20024 course",
  keywords: "rental, property, real estate",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* TailwindCSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>

      <body className={""} suppressHydrationWarning={true}>
        <Navbar />
        <main>{children}</main>
        {/* <Footer />
            <ToastContainer /> */}
      </body>
    </html>
  );
}

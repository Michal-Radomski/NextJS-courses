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
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
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

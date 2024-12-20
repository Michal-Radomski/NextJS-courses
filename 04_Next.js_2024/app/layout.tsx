import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

import "./styles/globals.css";
import "./styles/globals.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { GlobalProvider } from "@/context/GlobalContext";

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
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <head>
            {/* TailwindCSS CDN */}
            <script src="https://cdn.tailwindcss.com"></script>
          </head>

          <body suppressHydrationWarning={true}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
}

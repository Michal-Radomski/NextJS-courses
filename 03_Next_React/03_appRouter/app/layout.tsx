import type { Metadata } from "next";

import "./globals.scss";
import MainHeader from "@/components/main-header/main-header";

export const metadata: Metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}

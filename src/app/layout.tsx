import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "repfresh — a fresh workout, on demand",
  description:
    "Generate a workout in seconds, with form cues for every exercise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "repfresh — a fresh workout, on demand",
  description:
    "Generate a workout in seconds, with form cues for every exercise.",
  openGraph: {
    title: "repfresh — a fresh workout, on demand",
    description:
      "Generate a workout in seconds, with form cues for every exercise.",
    images: [
      {
        url: "/images/og-img.png",
        width: 1731,
        height: 909,
        alt: "repfresh workout builder preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "repfresh — a fresh workout, on demand",
    description:
      "Generate a workout in seconds, with form cues for every exercise.",
    images: ["/images/og-img.png"],
  },
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

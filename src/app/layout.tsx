import { env } from "@/env.mjs";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ReactNode } from "react";
import AppProvider from "../providers/app";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignLib - The biggest design library",
  description: "A library of design resources that will save you hours of hunting",
  keywords: [
    "Design resources",
    "Design library",
    "Figma",
    "Graphic design",
    "Tool library",
    "Biggest design library",
  ],
  authors: [
    {
      name: "Minhazur Rahaman Ratul",
      url: "http://developeratul.com",
    },
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_BASE_URL,
    title: "DesignLib - The biggest design library",
    description: "A library of design resources that will save you hours of hunting",
    siteName: "DesignLib",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout(props: Readonly<{ children: ReactNode }>) {
  const { children } = props;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";

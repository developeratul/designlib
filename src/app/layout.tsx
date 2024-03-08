import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ReactNode } from "react";
import AppProvider from "../providers/app";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignLib",
  description: "A library of design resources that will save you hours of hunting",
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

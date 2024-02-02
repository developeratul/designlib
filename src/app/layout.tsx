import SideBar from "@/components/layout/SideBar";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import AppProvider from "../providers/app";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignLib",
  description: "A library of design resources that will save you hours of hunting",
};

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "w-screen h-screen overflow-hidden")}>
        <AppProvider>
          <div className="w-full h-full overflow-hidden flex items-stretch">
            <SideBar />
            <div className="w-full min-h-full overflow-x-hidden">{children}</div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}

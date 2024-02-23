import { getAuthUser } from "@/actions/user.actions";
import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const user = await getAuthUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "w-screen h-screen antialiased overflow-hidden")}>
        <AppProvider>
          <div className="flex flex-col w-full h-full">
            <TopBar user={user} />
            <div className="w-full flex-1 h-full overflow-hidden flex gap-0 items-stretch">
              <SideBar user={user} />
              <ScrollArea className="w-full min-h-full">
                <div className="w-full h-full">{children}</div>
              </ScrollArea>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";

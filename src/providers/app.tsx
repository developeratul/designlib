"use client";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TanStackQueryProvider } from "@/lib/query-client";
import { AppProps } from "@/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function AppProvider(props: AppProps) {
  const { children } = props;
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme>
      <Toaster />
      <TanStackQueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </TanStackQueryProvider>
    </NextThemesProvider>
  );
}

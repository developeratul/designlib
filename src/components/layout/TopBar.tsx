"use client";
import LogoSrc from "@/assets/logo.svg";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { SideBarContent } from "./SideBar";

export default function TopBar() {
  return (
    <nav className="py-4 px-4 z-50 sticky w-full top-0 left-0 border-b bg-background/50 backdrop-blur-sm">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
              <Button size="icon" variant="ghost">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col items-start gap-4">
              <SheetHeader>
                <SheetTitle>DesignLib</SheetTitle>
              </SheetHeader>
              <div className="h-full flex-1 overflow-x-hidden w-full">
                <SideBarContent />
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-4">
            <Image src={LogoSrc} width={30} height={30} alt="DesignLib logo" />
            <h4
              className={cn(
                "text-lg font-semibold text-white hidden sm:block tracking-wide",
                manrope.className
              )}
            >
              DesignLib
            </h4>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <GitHubStarButton />
          <Link className={buttonVariants({ variant: "default" })} href="/submit">
            Submit
          </Link>
        </div>
      </div>
    </nav>
  );
}

function GitHubStarButton() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-github-repo-details"],
    queryFn: () => axios.get("http://api.github.com/repos/developeratul/designlib"),
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="https://github.com/developeratul/designlib"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-inherit mr-2" />
          ) : (
            <StarIcon className="w-4 h-4 text-inherit mr-2" />
          )}
          {isLoading ? "Fetching..." : `${data?.data.stargazers_count || 0} stars`}
        </Link>
      </TooltipTrigger>
      <TooltipContent>Star on GitHub</TooltipContent>
    </Tooltip>
  );
}

"use client";
import LogoSrc from "@/assets/logo.svg";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { MenuIcon, StarIcon } from "lucide-react";
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
          <Button size="icon" variant="outline">
            <StarIcon className="w-4 h-4 text-inherit" />
          </Button>
          <Link className={buttonVariants({ variant: "default" })} href="/submit">
            Submit
          </Link>
        </div>
      </div>
    </nav>
  );
}

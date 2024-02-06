"use client";
import LogoSrc from "@/assets/logo.svg";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

export default function TopBar() {
  return (
    <nav className="p-4 z-50 sticky w-full top-0 left-0 border-b bg-background/50 backdrop-blur-sm">
      <div className="container max-w-[1920px]">
        <div className="flex items-center w-full justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image src={LogoSrc} width={35} height={35} alt="DesignLib logo" />
            <h4 className={cn("text-lg font-semibold text-white tracking-wide", manrope.className)}>
              DesignLib
            </h4>
          </Link>
          <div className="flex items-center gap-3">
            <Button size="icon" variant="outline">
              <StarIcon className="w-4 h-4 text-inherit" />
            </Button>
            <Link className={buttonVariants({ variant: "default" })} href="/submit">
              Submit
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

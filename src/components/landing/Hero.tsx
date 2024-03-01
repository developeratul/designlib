"use client";

import UnderLineScribbleSrc from "@/assets/scribbles/underline.svg";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Boxes } from "../ui/background-boxes";
import { buttonVariants } from "../ui/button";

export default function Hero() {
  return (
    <header className="lg:py-52 py-24 sm:py-36 relative w-full overflow-hidden bg-background flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="container">
        <div className="w-full flex flex-col justify-center items-center gap-9 max-w-[900px] mx-auto">
          <div className="text-center z-20 space-y-6">
            <h1
              className={cn(
                manrope.className,
                "font-bold block text-white text-2xl sm:text-4xl tracking-tight md:text-5xl"
              )}
            >
              A library of{" "}
              <span className="text-primary inline-block sm:mb-2 md:mb-4 relative">
                design resources
                <Image
                  src={UnderLineScribbleSrc}
                  alt="Underline Scribble"
                  className="absolute w-full sm:-bottom-2 md:-bottom-4 -bottom-0"
                />
              </span>{" "}
              that will save you <span className="text-slate-400 inline-block">hours</span> of hunt!
            </h1>
            <p className="text-foreground text-sm font-medium sm:text-lg md:text-2xl">
              Find design resources to back your creative process. That will let you spend your time
              on doing actual work rather than finding the right tool. It&apos;s all here.
            </p>
          </div>
          <div className="w-full grid grid-cols-2 sm:flex items-center justify-center gap-3">
            <Link
              href="/categories"
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "text-sm z-20 sm:text-base md:text-lg h-auto py-4",
                })
              )}
            >
              Explore Resources
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "lg",
                  className: "text-sm z-20 sm:text-base md:text-lg h-auto py-4",
                })
              )}
              href="http://github.com/developeratul/designlib"
            >
              Star on GitHub
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

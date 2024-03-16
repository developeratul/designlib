"use client";

import LogoSrc from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { GithubIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="bg-card py-6">
      <div className="container">
        <div className="flex justify-between gap-8 items-center">
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-4">
              <Image src={LogoSrc} width={36} height={36} alt="DesignLib logo" />
              <h4
                className={cn("text-lg font-semibold text-white tracking-wide", manrope.className)}
              >
                DesignLib
              </h4>
            </Link>
            <p className="text-base font-medium text-muted-foreground">
              Built in public by{" "}
              <Link className="text-white" target="_blank" href="http://developeratul.com">
                @developeratul
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="http://twitter.com/developeratul" target="_blank">
              <Button size="icon" variant="outline">
                <TwitterIcon className="w-5 h-5 text-inherit" />
              </Button>
            </Link>
            <Link href="http://instagram.com/developeratul" target="_blank">
              <Button size="icon" variant="outline">
                <InstagramIcon className="w-5 h-5 text-inherit" />
              </Button>
            </Link>
            <Link href="http://github.com/developeratul" target="_blank">
              <Button size="icon" variant="outline">
                <GithubIcon className="w-5 h-5 text-inherit" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

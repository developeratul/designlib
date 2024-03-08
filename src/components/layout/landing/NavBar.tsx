"use client";
import LogoSrc from "@/assets/logo.svg";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { openUrlInNewTab } from "@/helpers";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="py-4 sticky top-0 bg-background/50 backdrop-blur-sm z-50 left-0">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4">
            <Image src={LogoSrc} width={36} height={36} alt="DesignLib logo" />
            <h4 className={cn("text-lg font-semibold text-white tracking-wide", manrope.className)}>
              DesignLib
            </h4>
          </Link>
          <div className="sm:flex items-center gap-3 hidden">
            <Link
              className={cn(buttonVariants({ variant: "secondary" }))}
              href="http://github.com/developeratul/designlib"
            >
              Star on GitHub
            </Link>
            <Link className={cn(buttonVariants({ variant: "default" }))} href="/categories">
              Explore Resources
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="sm:hidden" asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-0 px-0 min-w-[200px] py-0 bg-red-500">
              <DropdownMenuItem
                onClick={() => openUrlInNewTab("http://github.com/developeratul/designlib")}
                className="bg-secondary rounded-none py-3 px-3 text-secondary-foreground hover:bg-secondary/90"
              >
                Star on GitHub
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/categories")}
                className="bg-primary rounded-none py-3 px-3 text-primary-foreground hover:bg-primary/90"
              >
                Explore Resources
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

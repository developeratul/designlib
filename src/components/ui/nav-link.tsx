"use client";
import { cn } from "@/lib/utils";
import { AppProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { buttonVariants } from "./button";

export default function NavLink(props: { href: string; icon: ReactNode } & AppProps) {
  const { href, icon, children } = props;
  const pathName = usePathname();
  const isActive = href === pathName;
  return (
    <Link
      className={cn(
        buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
        "w-full justify-start items-center gap-4"
      )}
      href={href}
    >
      {icon}
      <span className="w-full line-clamp-1 text-left">{children}</span>
    </Link>
  );
}

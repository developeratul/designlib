"use client";
import { AppProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./button";

export default function NavLink(props: { href: string; icon: ReactNode } & AppProps) {
  const { href, icon, children } = props;
  const pathName = usePathname();
  const isActive = href === pathName;
  return (
    <Link className="w-full" href={href}>
      <Button
        className="w-full justify-start items-center gap-4"
        variant={isActive ? "default" : "ghost"}
      >
        {icon}
        {children}
      </Button>
    </Link>
  );
}

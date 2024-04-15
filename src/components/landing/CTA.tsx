"use client";

import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function CTA() {
  return (
    <section id="cta" className="bg-card border-b border-t py-24">
      <div className="container">
        <div className="flex flex-col justify-center items-center text-center gap-6">
          <div className="space-y-2">
            <h2 className={cn(manrope.className, "text-white text-4xl font-semibold")}>
              Let&apos;s make it big!
            </h2>
            <p className="text-lg max-w-2xl">
              Let&apos;s make <span className="text-primary">DesignLib</span> the place to seek
              design resources. Join the community and contribute to it by sharing new resources. We
              are currently in beta and accepting resource submissions generously.
            </p>
          </div>
          <Link className={cn(buttonVariants({ variant: "default" }))} href="/auth/login">
            Join the Community
          </Link>
        </div>
      </div>
    </section>
  );
}

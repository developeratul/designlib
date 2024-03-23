"use client";

import MessyResourceSrc from "@/assets/messy-resources.jpg";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { Alert, AlertTitle } from "../ui/alert";

export default function Problem() {
  return (
    <section id="the-problem">
      <div className="container">
        <div className="space-y-6">
          <h2 className={cn(manrope.className, "text-3xl max-w-[550px] text-white font-semibold")}>
            Ever felt lost while <span className="text-primary">gathering resources</span> from
            various platforms?
          </h2>
          <div className="flex flex-col xl:flex-row items-start gap-12">
            <Image
              className="w-full max-w-2xl rounded-md border"
              src={MessyResourceSrc}
              alt="Messy resources all around"
            />
            <div className="space-y-6">
              <div className="space-y-3 w-full flex-1">
                <div className="flex items-center gap-2">
                  <XIcon className="w-8 h-8 text-destructive shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    Too many resources around, feels messy.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon className="w-8 h-8 text-destructive shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    When I need a resource, I can&apos;t find it.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon className="w-8 h-8 text-destructive shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    It&apos;s hard to remember on which platform I saved it.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon className="w-8 h-8 text-destructive shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    Oh, I forgot the name of the website.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon className="w-8 h-8 text-destructive shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    I need resources for creating a color palette.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon className="w-8 h-8 text-destructive shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    I need a place where all the resources are together.
                  </div>
                </div>
              </div>

              <Alert>
                <AlertTitle
                  className={cn(manrope.className, "font-medium text-white tracking-normal")}
                >
                  <span className="text-primary font-semibold">DesignLib</span> has your back!
                </AlertTitle>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

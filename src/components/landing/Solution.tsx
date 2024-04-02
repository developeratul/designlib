"use client";

import SolutionImgSrc from "@/assets/solution.jpg";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

export default function Solution() {
  return (
    <section id="thsecroblem">
      <div className="container">
        <div className="space-y-6">
          <div className="flex flex-col xl:flex-row items-start gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-primary font-semibold uppercase text-sm">The Solution</p>
                <h2
                  className={cn(
                    manrope.className,
                    "text-3xl max-w-[550px] text-white font-semibold"
                  )}
                >
                  What if all the resources were gathered in one single place!
                </h2>
              </div>
              <div className="space-y-3 w-full flex-1">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-8 h-8 text-green-400 shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    Selective and organized resources.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-8 h-8 text-green-400 shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    Bookmark resources to find them easily.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-8 h-8 text-green-400 shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    Submit your favorite resource and get them added.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-8 h-8 text-green-400 shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    Never memorize website names again.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-8 h-8 text-green-400 shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    Resources for every occasion. Organized by categories.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-8 h-8 text-green-400 shrink-0 " />
                  <div className="text-lg text-white font-medium">
                    Everything related to design in one place!
                  </div>
                </div>
              </div>
            </div>

            <Image
              className="w-full max-w-2xl rounded-md border"
              src={SolutionImgSrc}
              width={1400}
              height={1400}
              alt="DesignLib is the answer!"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

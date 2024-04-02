"use client";

import {
  getAllBookmarksOfAuthUser,
  getPublicFeaturedResources,
  getTotalResourceCount,
} from "@/actions/resource.action";
import { caveat } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader, MessageCircleWarning } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import ResourceCard from "../resources/Card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function FeaturedResourcesSlider() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["get-featured-resources-and-others"],
    queryFn: async () => {
      const featuredResources = await getPublicFeaturedResources();
      const bookmarks = await getAllBookmarksOfAuthUser();
      const totalResourcesCount = await getTotalResourceCount();
      return { featuredResources, bookmarks, totalResourcesCount };
    },
  });

  const [start, setStart] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const direction = "right";
  const pauseOnHover = true;

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      // const scrollerContent = Array.from(scrollerRef.current.children);

      // scrollerContent.forEach((item) => {
      //   const duplicatedItem = item.cloneNode(true);
      //   if (scrollerRef.current) {
      //     scrollerRef.current.appendChild(duplicatedItem);
      //   }
      // });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, []);

  useEffect(() => {
    if (!isPending) {
      addAnimation();
    }
  }, [addAnimation, isPending]);

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-direction", "forwards");
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-duration", "40s");
    }
  };

  if (isPending) {
    return (
      <section id="featured-resources">
        <div className="container">
          <div className="flex flex-col justify-center items-center gap-4">
            <Loader className="w-6 h-6 text-foreground animate-spin" />
            <p className="text-foreground text-base font-medium text-center w-full">
              Loading featured resources...
            </p>
          </div>
        </div>
      </section>
    );
  }
  if (isError) {
    return (
      <section id="featured-resources">
        <div className="container">
          <Alert variant="destructive">
            <MessageCircleWarning className="h-4 w-4" />
            <AlertTitle>Oops! There was an error.</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  const { bookmarks, featuredResources, totalResourcesCount } = data;

  return (
    <motion.section
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      layout
      id="featured-resources"
    >
      <div className="container relative">
        <div className="absolute -top-24 left-6 flex flex-col gap-2 z-20">
          <div className={cn(caveat.className, "font-bold text-2xl text-white")}>
            {totalResourcesCount} resources
          </div>
          <svg
            width="99"
            height="39"
            className="self-end ml-6"
            viewBox="0 0 99 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_321_1047)">
              <path
                d="M2.14301 0.583904C5.41177 6.94323 10.3149 12.9615 16.4181 16.7192C19.384 18.5461 22.7671 19.5925 26.1844 18.4999C29.3217 17.4997 31.8704 15.1583 34.0934 12.7938C38.5223 8.09369 42.8082 1.85577 49.7972 1.31233C53.426 1.02905 56.8833 2.60154 59.792 4.66543C63.0494 6.97791 66.0438 9.70086 69.1126 12.2619C76.5016 18.4363 83.9363 24.5586 91.2739 30.8023C91.6567 31.1318 91.4967 31.5133 91.0567 31.629C90.5195 31.7677 89.8338 31.5249 89.4166 31.1838C82.7419 25.7032 76.153 20.1186 69.5355 14.5744C66.3524 11.9093 63.2037 9.18055 59.9635 6.58479C57.3405 4.48622 54.306 2.38764 50.8087 2.61311C47.4542 2.83279 44.5055 5.01809 42.1339 7.25541C39.6309 9.61992 37.5508 12.3949 35.1049 14.8114C32.8019 17.0835 30.1332 19.1127 26.9559 19.9047C23.3957 20.795 19.704 19.8873 16.5096 18.2281C12.9493 16.3781 9.81202 13.6205 7.09758 10.6663C4.38314 7.71213 1.94871 4.28965 0.0686008 0.630152C-0.417142 -0.317966 1.80584 -0.0751514 2.14301 0.583904Z"
                fill="white"
              />
              <path
                d="M86.8279 30.9757C90.4452 33.5425 94.234 35.8666 98.1771 37.89L96.6284 38.0519C97.0113 37.1963 96.4056 36.41 95.9598 35.7047C95.4684 34.93 94.9769 34.1554 94.4797 33.3864C93.4854 31.8486 92.4739 30.3166 91.451 28.7962C89.4052 25.761 87.2965 22.7722 85.1421 19.8122C84.8392 19.3959 85.4049 19.1936 85.7249 19.1763C86.2107 19.1531 86.8336 19.3612 87.1365 19.7659C89.4452 22.8531 91.6681 26.0039 93.8226 29.2009C94.874 30.7618 95.9027 32.3285 96.9199 33.9125C97.4342 34.7103 97.9714 35.5024 98.4457 36.3233C98.8514 37.0344 99.2057 37.8438 98.8514 38.6473C98.6171 39.1677 97.6856 39.0058 97.3028 38.8092C93.1882 36.6991 89.228 34.3172 85.4506 31.6405C85.1363 31.4151 84.8106 31.0393 85.2564 30.7618C85.6621 30.5132 86.4736 30.7155 86.8336 30.9699L86.8279 30.9757Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_321_1047">
                <rect width="99" height="39" fill="white" transform="matrix(1 0 0 -1 0 39)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div
        ref={containerRef}
        className={cn(
          "scroller relative container z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        )}
      >
        <div
          ref={scrollerRef}
          className={cn(
            "flex flex-row w-max flex-nowrap gap-4",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {featuredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              className="w-[350px] shrink-0 select-none pointer-events-none"
              isFeaturedShowOffNeeded={false}
              bookmarks={bookmarks}
              resource={resource}
            />
          ))}
          {featuredResources.map((resource) => (
            <ResourceCard
              key={`${resource.id}-dup`}
              className="w-[350px] shrink-0 select-none pointer-events-none"
              isFeaturedShowOffNeeded={false}
              bookmarks={bookmarks}
              resource={resource}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

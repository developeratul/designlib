"use client";

import { cn } from "@/lib/utils";
import { Bookmark, Resource } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import ResourceCard from "../resources/Card";

export default function FeaturedResourcesSlider(props: {
  data: Resource[];
  bookmarks: Bookmark[];
}) {
  const { data, bookmarks } = props;
  const [start, setStart] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const direction = "right";
  const pauseOnHover = true;

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, []);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-direction", "forwards");
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-duration", "20s");
    }
  };

  return (
    <section id="featured-resources">
      <div
        ref={containerRef}
        className={cn(
          "scroller relative container z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        )}
      >
        <div
          ref={scrollerRef}
          className={cn(
            "flex flex-row flex-nowrap gap-4",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {data.map((resource) => (
            <ResourceCard
              key={resource.id}
              className="w-[350px] shrink-0 select-none pointer-events-none"
              isFeaturedShowOffNeeded={false}
              bookmarks={bookmarks}
              resource={resource}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

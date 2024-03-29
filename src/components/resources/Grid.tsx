"use client";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Bookmark, ResourceWithMeta } from "@/types";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import ResourceCard from "./Card";

export default function ResourcesGrid(props: {
  resources: ResourceWithMeta[];
  bookmarks: Bookmark[];
  emptyMessage?: string;
  gridClassName?: string;
  isFeaturedShowOffNeeded?: boolean;
}) {
  const {
    resources,
    emptyMessage,
    bookmarks,
    gridClassName,
    isFeaturedShowOffNeeded = true,
  } = props;
  if (!resources.length) {
    return (
      <div className="w-full flex justify-center items-center py-24">
        <div className="w-full max-w-xs text-center space-y-8">
          <div className="space-y-2 flex flex-col justify-center items-center">
            <h2 className={cn("text-white font-semibold text-xl", manrope.className)}>
              No resources found
            </h2>
            <p className="text-sm">
              {emptyMessage ||
                "No resources added to this category yet. You can submit a new one if you want."}
            </p>
          </div>
          {!emptyMessage && (
            <Link href="/submit" className={buttonVariants({ variant: "default", size: "sm" })}>
              Submit new Resource
            </Link>
          )}
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-4",
        gridClassName
      )}
    >
      {resources.map((resource) => (
        <ResourceCard
          isFeaturedShowOffNeeded={isFeaturedShowOffNeeded}
          bookmarks={bookmarks}
          resource={resource}
          key={resource.id}
        />
      ))}
    </div>
  );
}

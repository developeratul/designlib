"use client";
import { getAllCategories } from "@/actions/category.action";
import NavLink from "@/components/ui/nav-link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { HomeIcon, Layers2, ViewIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function SideBar() {
  return (
    <ScrollArea className="w-full lg:block hidden max-w-[300px] min-h-full border-r overflow-x-hidden">
      <aside className="p-4">
        <SideBarContent />
      </aside>
    </ScrollArea>
  );
}

export function SideBarContent() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        <NavLink href="/" icon={<HomeIcon className="w-5 h-5 text-inherit" />}>
          Home
        </NavLink>
        <NavLink href="/listings" icon={<ViewIcon className="w-5 h-5 text-inherit" />}>
          Explore Listings
        </NavLink>
      </div>
      <Separator />
      <div className="space-y-4">
        <h4 className={cn(manrope.className, "font-semibold text-sm text-white")}>Categories</h4>
        <CategoryList />
      </div>
    </div>
  );
}

function CategoryList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: () => getAllCategories(),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-8" />
          ))}
      </div>
    );
  }

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {data?.map((category) => (
        <NavLink
          icon={<Layers2 className="w-5 h-5 text-primary" />}
          href={`/categories/${category.slug}`}
          key={category.id}
        >
          {category.title}
        </NavLink>
      ))}
    </div>
  );
}

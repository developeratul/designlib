"use client";
import { getAllCategories } from "@/actions/category.action";
import NavLink from "@/components/ui/nav-link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BookmarkIcon, HomeIcon, Layers2, LogInIcon, SendIcon } from "lucide-react";
import Link from "next/link";

export default function SideBar(props: { user: User | null }) {
  const { user } = props;
  return (
    <div className="w-full lg:block hidden max-w-[300px] border-r overflow-hidden">
      <aside className="grid grid-rows-2 w-full h-full overflow-hidden">
        <ScrollArea className="row-span-full">
          <div className="p-4 w-full h-full">
            <SideBarContent user={user} />
          </div>
        </ScrollArea>
        <SideBarFooter />
      </aside>
    </div>
  );
}

export function SideBarContent(props: { user: User | null }) {
  const { user } = props;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        <NavLink href="/" icon={<HomeIcon className="w-5 h-5 text-inherit" />}>
          Home
        </NavLink>
        {!user && (
          <NavLink href="/auth/login" icon={<LogInIcon className="w-5 h-5 text-inherit" />}>
            Login
          </NavLink>
        )}
        {user && (
          <NavLink href="/bookmarks" icon={<BookmarkIcon className="w-5 h-5 text-inherit" />}>
            Bookmarks
          </NavLink>
        )}
        {user && (
          <NavLink href="/submit" icon={<SendIcon className="w-5 h-5 text-inherit" />}>
            Submit new Resource
          </NavLink>
        )}
        {/* <NavLink href="/listings" icon={<ViewIcon className="w-5 h-5 text-inherit" />}>
          Explore Listings
        </NavLink> */}
      </div>
      <Separator />
      <div className="space-y-4">
        <h4 className={cn(manrope.className, "font-semibold text-sm text-white")}>Categories</h4>
        <CategoryList />
      </div>
    </div>
  );
}

export function SideBarFooter() {
  return (
    <div className="p-4 border-t bg-background">
      <p className="text-sm">
        A community driven project created and maintained by{" "}
        <Link
          target="_blank"
          href="https://www.developeratul.com"
          className="text-white hover:underline underline-offset-2"
        >
          @developeratul
        </Link>
      </p>
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

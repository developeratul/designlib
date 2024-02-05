import { getAllCategories } from "@/actions/category.action";
import LogoSrc from "@/assets/logo.svg";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { DiamondIcon, HomeIcon, StarIcon, ViewIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavLink from "../ui/nav-link";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default async function SideBar() {
  const categories = await getAllCategories();
  return (
    <ScrollArea className="w-full max-w-[300px] min-h-full border-r overflow-x-hidden">
      <aside>
        <div className="p-4 border-b sticky top-0 left-0 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <Image src={LogoSrc} width={35} height={35} alt="DesignLib logo" />
              <h4 className={cn("text-lg font-bold text-white tracking-wider", manrope.className)}>
                DesignLib
              </h4>
            </Link>
            <Button size="icon" variant="outline">
              <StarIcon className="w-4 h-4 text-inherit" />
            </Button>
          </div>
        </div>
        <div className="px-4 space-y-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <NavLink href="/" icon={<HomeIcon className="w-5 h-5 text-inherit" />}>
              Home
            </NavLink>
            <NavLink href="/listings" icon={<ViewIcon className="w-5 h-5 text-inherit" />}>
              Explore Listings
            </NavLink>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className={cn(manrope.className, "font-semibold text-sm text-muted-foreground")}>
              Categories
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {categories.map((category) => (
                <NavLink
                  icon={<DiamondIcon className="w-5 h-5 text-primary" />}
                  href={`/categories/${category.slug}`}
                  key={category.id}
                >
                  {category.title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </ScrollArea>
  );
}

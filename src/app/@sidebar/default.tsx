import { getAllCategories } from "@/actions/category.action";
import NavLink from "@/components/ui/nav-link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { HomeIcon, Layers2, ViewIcon } from "lucide-react";

export default async function SideBar() {
  const categories = await getAllCategories();
  return (
    <ScrollArea className="w-full lg:block hidden max-w-[300px] min-h-full border-r overflow-x-hidden">
      <aside>
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
          <div className="space-y-4">
            <h4 className={cn(manrope.className, "font-semibold text-sm text-white")}>
              Categories
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {categories.map((category) => (
                <NavLink
                  icon={<Layers2 className="w-5 h-5 text-primary" />}
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

export const dynamic = "force-dynamic";

import { getCategoryBySlug } from "@/actions/category.action";
import ResourcesGrid from "@/components/resources/Grid";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { DiamondIcon } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function CategoryPage(props: Props) {
  const { params } = props;
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className={cn("text-3xl text-white font-semibold", manrope.className)}>
            {category.title}
          </h1>
          <p>{category.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="flex items-center gap-2 py-1 px-2 text-sm">
            <DiamondIcon className="w-4 h-4 text-inherit" />
            {category.resources.length} resource(s)
          </Badge>
        </div>
      </div>
      <Separator />
      <ResourcesGrid resources={category.resources} />
    </div>
  );
}

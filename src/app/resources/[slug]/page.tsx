import { getResourceBySlug, getSimilarResources } from "@/actions/resource.action";
import ResourcesGrid from "@/components/resources/Grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StorageBucket } from "@/constants/supabase";
import { getFileUrl } from "@/helpers/supabase";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ImageIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ResourceDetailsPage(props: Props) {
  const { params } = props;
  const resource = await getResourceBySlug(params.slug);

  if (!resource) {
    return notFound();
  }

  const similarResource = await getSimilarResources(resource.slug);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-start gap-8">
        <Avatar className="rounded-sm aspect-video flex-shrink-0 w-full max-w-full lg:max-w-md md:max-w-sm h-auto border">
          <AvatarImage
            className="object-cover"
            src={getFileUrl(StorageBucket.ResourceThumbnails, resource.thumbnailPath || "")}
            alt={resource.title}
          />
          <AvatarFallback className="rounded-sm">
            <ImageIcon className="w-8 h-8 text-inherit" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-5 w-full flex-1">
          <div className="flex items-center gap-4 flex-nowrap">
            <Link
              href={`/categories/${resource.category?.slug}`}
              className={cn(buttonVariants({ variant: "link" }), "p-0")}
            >
              {resource.category?.title}
            </Link>
            <ArrowRightIcon className="w-4 h-4 text-muted-foreground" />
            <Link
              href={`/categories/${resource.category?.slug}`}
              className={cn(buttonVariants({ variant: "link" }), "p-0")}
            >
              {resource.title}
            </Link>
          </div>
          <div className="space-y-2">
            <h1 className={cn("text-3xl text-white font-semibold", manrope.className)}>
              {resource.title}
            </h1>
            <p>{resource.description}</p>
          </div>
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            href={resource.link}
            className={buttonVariants({ variant: "secondary" })}
          >
            <LinkIcon className="w-4 h-4 text-inherit mr-2" /> Visit
          </Link>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h2 className={cn("text-xl text-white font-semibold", manrope.className)}>
          Similar resources
        </h2>
        <ResourcesGrid emptyMessage="No similar resources found" resources={similarResource} />
      </div>
    </div>
  );
}

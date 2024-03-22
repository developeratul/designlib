import {
  getAllBookmarksOfAuthUser,
  getResourceBySlug,
  getSimilarResources,
} from "@/actions/resource.action";
import { BookmarkResource } from "@/components/resources/Card";
import ResourcesGrid from "@/components/resources/Grid";
import ShareButton from "@/components/resources/ShareButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StorageBucket } from "@/constants/supabase";
import { getTwoWordRepresentation } from "@/helpers";
import { getFileUrl } from "@/helpers/supabase";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ImageIcon, LinkIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const resource = await getResourceBySlug(params.slug);

  if (!resource) {
    return notFound();
  }

  return {
    title: `DesignLib - ${resource.title}`,
    description: resource.description,
  };
}

export default async function ResourceDetailsPage(props: Props) {
  const { params } = props;
  const resource = await getResourceBySlug(params.slug);
  const bookmarks = await getAllBookmarksOfAuthUser();

  if (!resource) {
    return notFound();
  }

  const similarResource = await getSimilarResources(resource.slug);

  return (
    <div className="space-y-12 container">
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
        <div className="space-y-8 w-full flex-1">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-4 flex-nowrap">
                <Link
                  href={`/categories/${resource.category?.slug}`}
                  className={cn(
                    buttonVariants({ variant: "link", className: "pl-0 pr-0 pt-0 pb-0" })
                  )}
                >
                  {resource.category?.title}
                </Link>
                <ArrowRightIcon className="w-4 h-4 text-muted-foreground" />
                <Link
                  href={`/categories/${resource.category?.slug}`}
                  className={cn(
                    buttonVariants({ variant: "link", className: "pl-0 pr-0 pt-0 pb-0" })
                  )}
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
            </div>

            {resource.isFeatured && (
              <div className="flex items-center gap-2">
                <Badge>Featured</Badge>
                <Badge>Recommended by us</Badge>
              </div>
            )}

            {resource.user && (
              <div className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                Shared by
                <Link
                  className="inline-flex items-center gap-2"
                  href={`/u/${resource.user.username}`}
                >
                  <Avatar className="w-5 h-5">
                    <AvatarImage
                      src={
                        resource.user.avatarPath
                          ? getFileUrl(StorageBucket.Avatars, resource.user.avatarPath)
                          : ""
                      }
                    />
                    <AvatarFallback className="text-[6px]">
                      {getTwoWordRepresentation(resource.user.display_name)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-white">{resource.user.display_name}</p>
                </Link>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <Link
                target="_blank"
                referrerPolicy="no-referrer"
                href={resource.link}
                className={buttonVariants({ variant: "secondary" })}
              >
                <LinkIcon className="w-4 h-4 text-inherit mr-2" /> Visit
              </Link>
              <BookmarkResource resource={resource} bookmarks={bookmarks} />
            </div>
            <ShareButton resource={resource} />
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h2 className={cn("text-xl text-white font-semibold", manrope.className)}>
          Similar resources
        </h2>
        <ResourcesGrid
          bookmarks={bookmarks}
          emptyMessage="No similar resources found"
          resources={similarResource}
        />
      </div>
    </div>
  );
}

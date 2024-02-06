import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StorageBucket } from "@/constants/supabase";
import { getFileUrl } from "@/helpers/supabase";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Resource } from "@/types";
import { ImageIcon, LinkIcon } from "lucide-react";
import Link from "next/link";

export default function ResourceCard(props: { resource: Resource }) {
  const { resource } = props;
  return (
    <Card className="flex flex-col gap-0">
      <CardContent className="p-0 overflow-hidden flex-1 h-full">
        <div className="space-y-4">
          <Avatar className="rounded-sm aspect-video w-full h-auto border-b">
            <AvatarImage
              className="object-cover"
              src={getFileUrl(StorageBucket.ResourceThumbnails, resource.thumbnailPath || "")}
              alt={resource.title}
            />
            <AvatarFallback className="rounded-sm">
              <ImageIcon className="w-8 h-8 text-inherit" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 px-6 py-2">
            <h2 className={cn("line-clamp-1 font-semibold text-white text-lg", manrope.className)}>
              {resource.title}
            </h2>
            {resource.description && (
              <p className="line-clamp-2 text-foreground text-sm">{resource.description}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 items-center p-6">
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={`/resources/${resource.slug}`}
        >
          Show more
        </Link>
        <Link
          className={buttonVariants({ variant: "secondary", size: "icon" })}
          href={resource.link}
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <LinkIcon className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

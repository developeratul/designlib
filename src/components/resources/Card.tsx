"use client";
import { bookmarkResource } from "@/actions/resource.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StorageBucket } from "@/constants/supabase";
import { getFileUrl } from "@/helpers/supabase";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Bookmark, ResourceWithMeta } from "@/types";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { BookmarkIcon, ImageIcon, LinkIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Props {
  resource: ResourceWithMeta;
  bookmarks: Bookmark[];
}

export default function ResourceCard(props: Props) {
  const { resource, bookmarks } = props;

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
      <CardFooter className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
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
        </div>
        <BookmarkResource resource={resource} bookmarks={bookmarks} />
      </CardFooter>
    </Card>
  );
}

export function BookmarkResource(props: Props) {
  const { resource, bookmarks } = props;
  const supabase = createClientComponentClient<Database>();
  const [isPending, setPending] = useState(false);
  const router = useRouter();
  const isBookmarked = useMemo(() => {
    return bookmarks.find((bookmark) => bookmark.resourceId === resource.id);
  }, [bookmarks, resource.id]);

  const handleCreateBookMark = async () => {
    try {
      setPending(true);
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/auth/login");
        return toast.error("Please login to bookmark this resource");
      }

      const isBookmarked = await bookmarkResource(resource.id);

      toast.success(isBookmarked ? "Added to bookmarks" : "Removed from bookmarks", {
        action: {
          label: "View bookmarks",
          onClick: () => router.push("/bookmarks"),
        },
      });
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      disabled={isPending}
      size="icon"
      variant={isBookmarked ? "default" : "outline"}
      onClick={handleCreateBookMark}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <BookmarkIcon className="h-4 w-4" />
      )}
    </Button>
  );
}

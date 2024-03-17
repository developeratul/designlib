import { getAllBookmarksOfAuthUser } from "@/actions/resource.action";
import { getAuthUser, getPublicUserDetails } from "@/actions/user.actions";
import ResourcesGrid from "@/components/resources/Grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UpdateProfileDetailsModal from "@/components/user/UpdateProfileDetails";
import { StorageBucket } from "@/constants/supabase";
import { getTwoWordRepresentation } from "@/helpers";
import { getFileUrl } from "@/helpers/supabase";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { DiamondIcon, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: { username: string };
}

export default async function UserPage(props: Props) {
  const { params } = props;
  const authUser = await getAuthUser();
  const userDetails = await getPublicUserDetails(params.username);
  const bookmarks = await getAllBookmarksOfAuthUser();
  const isSelf = authUser?.username === params.username;

  if (!userDetails) {
    return notFound();
  }

  return (
    <main>
      <div className="container max-w-2xl py-12">
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24 flex-shrink-0">
              <AvatarImage
                src={
                  userDetails.avatarPath
                    ? getFileUrl(StorageBucket.Avatars, userDetails.avatarPath)
                    : ""
                }
              />
              <AvatarFallback>{getTwoWordRepresentation(userDetails.display_name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-4 w-full flex-1">
              <div className="w-full space-y-0">
                <div className="flex items-start gap-4 justify-between">
                  <h2
                    className={cn(
                      manrope.className,
                      "font-semibold w-full line-clamp-2 text-xl text-white"
                    )}
                  >
                    {userDetails.display_name}
                  </h2>
                  {isSelf && <UpdateProfileDetailsModal user={userDetails} />}
                </div>
                <p>@{userDetails.username}</p>
              </div>
              <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                {userDetails.bio || "404 bio not found"}
              </p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex gap-6 items-start">
                  <div className="bg-primary/10 shrink-0 border-primary/30 border text-primary w-12 h-12 flex justify-center items-center rounded-md">
                    <DiamondIcon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Approved Resources</p>
                    <h4 className={cn(manrope.className, "font-bold text-white text-2xl")}>
                      {userDetails.resources.length}
                    </h4>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>User&apos;s approved resource submissions</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex gap-6 items-start">
                  <div className="bg-orange-400/10 shrink-0 border-orange-400/30 border text-orange-400 w-12 h-12 flex justify-center items-center rounded-md">
                    <StarIcon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Featured resources</p>
                    <h4 className={cn(manrope.className, "font-bold text-white text-2xl")}>
                      {userDetails.resources.filter((resource) => resource.isFeatured).length}
                    </h4>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                User&apos;s featured resource submissions. These are the resources that are
                recommended by us.
              </TooltipContent>
            </Tooltip>
          </div>
          <Separator />
          <div className="space-y-4">
            <h2 className={cn(manrope.className, "text-base text-white font-semibold")}>
              Approved Resources
            </h2>
            <ResourcesGrid
              gridClassName="!grid-cols-1 sm:!grid-cols-2"
              emptyMessage="No approved resources found."
              resources={userDetails.resources}
              bookmarks={bookmarks}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

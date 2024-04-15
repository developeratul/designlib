"use client";
import LogoSrc from "@/assets/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { StorageBucket } from "@/constants/supabase";
import { getTwoWordRepresentation, openUrlInNewTab } from "@/helpers";
import { getFileUrl } from "@/helpers/supabase";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SideBarContent, SideBarFooter } from "./SideBar";

export default function TopBar(props: { user: User | null }) {
  const { user } = props;
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  return (
    <nav className="py-4 px-8 z-50 sticky w-full top-0 left-0 border-b bg-background/50 backdrop-blur-sm">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
              <Button size="icon" variant="ghost">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex gap-0 flex-col items-start p-0">
              <SheetHeader className="p-4">
                <SheetTitle>DesignLib</SheetTitle>
              </SheetHeader>
              <div className="h-full flex-1 grid grid-rows-2 overflow-x-hidden w-full">
                <div className="row-span-full px-4 overflow-x-hidden">
                  <SideBarContent user={user} />
                </div>
                <SideBarFooter />
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/categories" className="flex items-center gap-2">
            <Image src={LogoSrc} width={30} height={30} alt="DesignLib logo" />
            <h4
              className={cn(
                "text-lg font-semibold text-white hidden sm:block tracking-wide",
                manrope.className
              )}
            >
              DesignLib
            </h4>
            <div className="text-xs uppercase text-muted-foreground self-end">Beta</div>
          </Link>
        </div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user.avatarPath ? getFileUrl(StorageBucket.Avatars, user.avatarPath) : ""}
                />
                <AvatarFallback>{getTwoWordRepresentation(user.display_name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/u")}>View profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/submit")}>
                Submit new Resource
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => openUrlInNewTab("https://github.com/developeratul/designlib")}
              >
                Star on GitHub
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/");
                  router.refresh();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3">
            <GitHubStarButton />
            <Link className={buttonVariants({ variant: "default" })} href="/submit">
              Submit
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function GitHubStarButton() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-github-repo-details"],
    queryFn: () => axios.get("http://api.github.com/repos/developeratul/designlib"),
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="https://github.com/developeratul/designlib"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-inherit mr-2" />
          ) : (
            <StarIcon className="w-4 h-4 text-inherit mr-2" />
          )}
          {isLoading ? "Fetching..." : `${data?.data.stargazers_count || 0} stars`}
        </Link>
      </TooltipTrigger>
      <TooltipContent>Star on GitHub</TooltipContent>
    </Tooltip>
  );
}

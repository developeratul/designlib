"use client";
import { env } from "@/env.mjs";
import { Resource } from "@/types";
import { ShareIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ShareButton(props: { resource: Resource }) {
  const { resource } = props;
  const handleShareResource = async () => {
    const shareData: ShareData = {
      title: `${resource.title} - DesignLib`,
      text: `${resource.title} - Checkout this amazing design resource on DesignLib`,
      url: `${env.NEXT_PUBLIC_BASE_URL}/resources/${resource.slug}`,
    };

    const canShare = navigator.canShare(shareData);

    if (!canShare) {
      return toast.error("Sharing is not supported by your browser");
    }

    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger onClick={handleShareResource} asChild>
        <Button size="icon" variant="outline">
          <ShareIcon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Share resource</TooltipContent>
    </Tooltip>
  );
}

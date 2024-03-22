"use client";
import { checkUsernameAvailability } from "@/actions/auth.actions";
import { updateProfileDetails } from "@/actions/user.actions";
import { updateProfileDetailsFormSchema } from "@/app/(app)/u/[username]/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StorageBucket } from "@/constants/supabase";
import { generateUniqueFileName } from "@/helpers";
import { getFileUrl } from "@/helpers/supabase";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircleIcon, CheckIcon, ImageIcon, Loader2Icon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function UpdateProfileDetailsModal(props: {
  user: {
    id: string;
    username: string;
    display_name: string;
    bio: string | null;
    avatarPath: string | null;
  };
}) {
  const { user } = props;
  const supabase = createClientComponentClient();
  const [isOpen, { toggle }] = useDisclosure();
  const router = useRouter();

  const form = useForm<z.infer<typeof updateProfileDetailsFormSchema>>({
    resolver: zodResolver(updateProfileDetailsFormSchema),
    defaultValues: {
      username: user.username,
      display_name: user.display_name || "",
      bio: user.bio || "",
      avatarPath: user.avatarPath || "",
    },
  });
  const [debouncedUsername] = useDebouncedValue(form.watch("username"), 500);

  const avatarPath = form.watch("avatarPath");

  const avatarPreviewUrl = useMemo(() => {
    if (avatarPath) {
      return getFileUrl(StorageBucket.Avatars, avatarPath);
    }
    return "";
  }, [avatarPath]);

  const isQueryEnabled = debouncedUsername.length > 0;
  const { data, isLoading, isError, error, isFetchedAfterMount } = useQuery({
    queryKey: ["check-username-availability", debouncedUsername],
    queryFn: ({ queryKey }) => checkUsernameAvailability(queryKey[1] as string),
    enabled: isQueryEnabled,
  });

  const isUsernameAvailable = useMemo(() => {
    return data?.available || false;
  }, [data]);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["submit-profile-details"],
    mutationFn: (data: z.infer<typeof updateProfileDetailsFormSchema>) => {
      return updateProfileDetails(data);
    },
  });

  const onSubmit = async (values: z.infer<typeof updateProfileDetailsFormSchema>) => {
    if (!isUsernameAvailable) {
      return form.setError("username", { message: "Username already taken" });
    }
    try {
      const username = await mutateAsync(values);
      toggle();
      router.push(`/u/${username}`);
      router.refresh();
      toast.success("Successfully updated your profile details");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleAvatarChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { files } = e.target;
    if (files && files.length > 0 && files[0]) {
      const file = files[0];
      const fileName = generateUniqueFileName(file.name);

      const uploadPromise = supabase.storage
        .from(StorageBucket.Avatars)
        .upload(fileName, file, { contentType: file.type });

      toast.promise(uploadPromise, {
        loading: "Uploading avatar...",
        success: ({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }

          form.setValue("avatarPath", data.path);
          return "Avatar uploaded";
        },
        error: (error: Error) => {
          return error.message;
        },
      });

      // Delete the old one if any
      if (avatarPath) {
        await supabase.storage.from(StorageBucket.Avatars).remove([avatarPath]);
      }
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
      form.setError("username", { message: error.message });
    }
  }, [isError, error, form]);

  return (
    <Dialog open={isOpen} onOpenChange={toggle} modal>
      <DialogTrigger onClick={toggle} asChild>
        <Button size="sm" className={cn("text-xs h-8 rounded-full px-4")} variant="secondary">
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Update your public profile details.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="space-y-2">
              <Label>Profile Avatar</Label>
              <Avatar className="w-20 h-20">
                <AvatarImage src={avatarPreviewUrl} />
                <AvatarFallback>
                  <ImageIcon className="w-6 h-6 text-inherit" />
                </AvatarFallback>
              </Avatar>
              <Input type="file" onChange={handleAvatarChange} />
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="johndoe" {...field} />
                      {isLoading ? (
                        <div className="h-full top-0 right-0 absolute flex pr-3 justify-center items-center">
                          <LoaderIcon className="w-4 h-4 text-gray-500 animate-spin" />
                        </div>
                      ) : (
                        isFetchedAfterMount &&
                        (isUsernameAvailable ? (
                          <div className="h-full top-0 right-0 absolute flex pr-3 justify-center items-center">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <CheckIcon className="w-4 h-4 text-green-500" />
                              </TooltipTrigger>
                              <TooltipContent>This username is available</TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <div className="h-full top-0 right-0 absolute flex pr-3 justify-center items-center">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertCircleIcon className="w-4 h-4 text-destructive" />
                              </TooltipTrigger>
                              <TooltipContent>This username is unavailable</TooltipContent>
                            </Tooltip>
                          </div>
                        ))
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>This will be your profile handle</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a short story about yourself..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} className="self-end" type="submit">
              {isPending && <Loader2Icon className="w-5 h-5 mr-2 text-inherit animate-spin" />}
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

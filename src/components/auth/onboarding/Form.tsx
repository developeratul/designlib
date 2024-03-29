"use client";
import { checkUsernameAvailability, submitProfileDetails } from "@/actions/auth.actions";
import { uploadUserAvatarFromUrl } from "@/actions/user.actions";
import { onboardingFormSchema } from "@/app/auth/onboarding/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { StorageBucket } from "@/constants/supabase";
import { generateUniqueFileName } from "@/helpers";
import { getFileUrl } from "@/helpers/supabase";
import { Database } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "@mantine/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircleIcon, CheckIcon, ImageIcon, Loader, Loader2, LogOutIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function OnboardingForm(props: {
  providedUserData?: { display_name?: string; avatarUrl?: string };
}) {
  const { providedUserData } = props;
  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      username: "",
      display_name: providedUserData?.display_name || "",
      bio: "",
      avatarPath: "",
    },
  });
  const [debouncedUsername] = useDebouncedValue(form.watch("username"), 500);

  const avatarPath = form.watch("avatarPath");
  const avatarPreviewUrl = useMemo(() => {
    if (avatarPath) {
      return getFileUrl(StorageBucket.Avatars, avatarPath);
    }
    if (providedUserData?.avatarUrl) {
      return providedUserData.avatarUrl;
    }
  }, [providedUserData?.avatarUrl, avatarPath]);

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
    mutationFn: (data: z.infer<typeof onboardingFormSchema>) => {
      return submitProfileDetails(data);
    },
  });

  const searchParams = useSearchParams();
  const nextRoute = searchParams.get("next");
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof onboardingFormSchema>) => {
    if (!isUsernameAvailable) {
      return form.setError("username", { message: "Username already taken" });
    }

    try {
      let finalAvatarPath = values.avatarPath;

      if (providedUserData?.avatarUrl && !values.avatarPath) {
        const path = await uploadUserAvatarFromUrl(providedUserData.avatarUrl);
        form.setValue("avatarPath", path);
        finalAvatarPath = path;
      }

      const { username } = await mutateAsync({
        ...values,
        avatarPath: finalAvatarPath,
      });
      toast.success("Profile details updated successfully");
      if (nextRoute) {
        router.push(`/${nextRoute}`);
      } else {
        router.push(`/u/${username}`);
        router.refresh();
      }
      form.reset();
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

      const { error, data } = await supabase.storage
        .from(StorageBucket.Avatars)
        .upload(fileName, file, {
          contentType: file.type,
        });

      if (error) {
        return toast.error(error.message);
      }

      form.setValue("avatarPath", data.path);
      toast.success("Avatar uploaded successfully");

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
                      <Loader className="w-4 h-4 text-gray-500 animate-spin" />
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
        <div className="flex gap-4 justify-end items-center">
          <Button
            type="button"
            variant="secondary"
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/");
              router.refresh();
            }}
          >
            <LogOutIcon className="w-4 h-4 text-destructive mr-2" /> Logout
          </Button>
          <Button disabled={isPending} className="self-end" type="submit">
            {isPending && <Loader2 className="w-5 h-5 mr-2 text-inherit animate-spin" />}
            {isPending ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";
import { checkUsernameAvailability, submitProfileDetails } from "@/actions/auth.actions";
import { profileDetailsFormSchema } from "@/app/auth/onboarding/constants";
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
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircleIcon, CheckIcon, Loader, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ProfileDetailsForm() {
  const form = useForm<z.infer<typeof profileDetailsFormSchema>>({
    resolver: zodResolver(profileDetailsFormSchema),
    defaultValues: {
      username: "",
      display_name: "",
      bio: "",
      avatarPath: "",
    },
  });
  const [debouncedUsername] = useDebouncedValue(form.watch("username"), 1000);

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
    mutationFn: (data: z.infer<typeof profileDetailsFormSchema>) => {
      return submitProfileDetails(data);
    },
  });

  const searchParams = useSearchParams();
  const nextRoute = searchParams.get("next");
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof profileDetailsFormSchema>) => {
    if (!isUsernameAvailable) {
      return form.setError("username", { message: "Username already taken" });
    }
    try {
      await mutateAsync(values);
      form.reset();
      toast.success("Profile details updated successfully");
      if (nextRoute) {
        router.push(nextRoute);
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
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
                          <TooltipTrigger>
                            <CheckIcon className="w-4 h-4 text-green-500" />
                          </TooltipTrigger>
                          <TooltipContent>This username is available</TooltipContent>
                        </Tooltip>
                      </div>
                    ) : (
                      <div className="h-full top-0 right-0 absolute flex pr-3 justify-center items-center">
                        <Tooltip>
                          <TooltipTrigger>
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
          {isPending && <Loader2 className="w-5 h-5 mr-2 text-inherit animate-spin" />}
          {isPending ? "Submitting" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

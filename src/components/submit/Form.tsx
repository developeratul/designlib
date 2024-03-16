"use client";

import { fetchResourceData, submitResource } from "@/actions/resource.action";
import { submitResourceForm } from "@/app/(app)/submit/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StorageBucket } from "@/constants/supabase";
import { generateUniqueFileName } from "@/helpers";
import { getFileUrl } from "@/helpers/supabase";
import { Category } from "@/types";
import { Database } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowRightIcon, InfoIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function SubmitResourceForm(props: { categories: Category[] }) {
  const { categories } = props;
  const supabase = createClientComponentClient<Database>();
  const { isLoading, data } = useQuery({
    queryKey: ["get-auth-user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) return null;
      const { user } = data;
      const dbUserQuery = await supabase
        .from("users")
        .select("display_name,username")
        .eq("id", user.id)
        .single();
      if (dbUserQuery.error) return null;
      return dbUserQuery.data;
    },
  });
  const [hasFetchedInitialData, setFetchedInitialData] = useState(false);
  const form = useForm<z.infer<typeof submitResourceForm>>({
    resolver: zodResolver(submitResourceForm),
    defaultValues: {
      link: "",
      title: "",
      description: "",
      slug: "",
      thumbnailPath: "",
    },
  });
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["submit-new-resource"],
    mutationFn: (data: z.infer<typeof submitResourceForm>) => submitResource(data),
  });

  const thumbnailPath = form.watch("thumbnailPath");
  const thumbnailPreviewUrl = useMemo(() => {
    if (thumbnailPath) {
      return getFileUrl(StorageBucket.ResourceThumbnails, thumbnailPath);
    }
    return "";
  }, [thumbnailPath]);

  if (isLoading) {
    return (
      <div className="w-full min-h-full flex py-12 justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!hasFetchedInitialData) {
    return <FetchInitialData form={form} setFetchedInitialData={setFetchedInitialData} />;
  }

  const handleThumbnailChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { files } = e.target;
    if (files && files.length > 0 && files[0]) {
      const file = files[0];
      const fileName = generateUniqueFileName(file.name);

      const { error, data } = await supabase.storage
        .from(StorageBucket.ResourceThumbnails)
        .upload(fileName, file);

      if (error) {
        return toast.error(error.message);
      }

      form.setValue("thumbnailPath", data.path);
      toast.success("Thumbnail uploaded successfully");

      // Delete the old one if any
      if (thumbnailPath) {
        await supabase.storage.from(StorageBucket.ResourceThumbnails).remove([thumbnailPath]);
      }
    }
  };

  const handleGenerateSlug = () => {
    const title = form.watch("title");
    const generatedSlug = slugify(title, { lower: true });
    form.setValue("slug", generatedSlug);
  };

  const onSubmit = async (values: z.infer<typeof submitResourceForm>) => {
    try {
      await mutateAsync(values);
      router.push("/submit/success");
      toast.success("Submission successful");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="thumbnailFileInput">Thumbnail image</Label>
          {thumbnailPreviewUrl && (
            <Image
              src={thumbnailPreviewUrl}
              alt="Resource thumbnail image"
              width={1600}
              height={900}
              className="w-full border rounded-md aspect-video object-cover"
            />
          )}
          <Input id="thumbnailFileInput" type="file" onChange={handleThumbnailChange} />
          <p className={"text-sm text-muted-foreground"}>
            We would appreciate if you could add one :)
          </p>
        </div>
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input type="url" placeholder="http://designlib.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="DesignLib" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <div className="flex gap-2 items-center">
                  <Input placeholder="design-lib" {...field} />
                  <Button type="button" onClick={handleGenerateSlug} variant="secondary">
                    Generate
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the resource in short" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? "Submitting..." : "Submit"}
          {isPending && <Loader2 className="w-4 h-4 ml-2 text-inherit animate-spin" />}
        </Button>
        <Alert variant="info">
          <InfoIcon className="w-4 h-4 text-inherit" />
          <AlertDescription>
            You are submitting this resource as{" "}
            {data ? <b className="text-primary">@{data.username}</b> : <b>a Guest</b>}
          </AlertDescription>
        </Alert>
      </form>
    </Form>
  );
}

function FetchInitialData(props: {
  form: UseFormReturn<z.infer<typeof submitResourceForm>>;
  setFetchedInitialData: Dispatch<SetStateAction<boolean>>;
}) {
  const { form, setFetchedInitialData } = props;
  const [isPending, setPending] = useState(false);
  const [url, setUrl] = useState("");

  const { mutateAsync } = useMutation({
    mutationKey: ["fetch-resource-data", url],
    mutationFn: (url: string) => fetchResourceData(url),
  });

  const handleFetchData: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValidUrl = z
      .string()
      .url()
      .regex(/^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/)
      .trim()
      .safeParse(url).success;

    if (!isValidUrl) {
      return toast.error("Invalid URL");
    }

    try {
      setPending(true);
      const { title, description, ogImagePath } = await mutateAsync(url);

      form.setValue("title", title);
      form.setValue("slug", slugify(title, { lower: true, trim: true }));
      form.setValue("description", description);
      form.setValue("thumbnailPath", ogImagePath);

      toast.success("Successfully fetched data from the URL");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      form.setValue("link", url);
      setPending(false);
      setFetchedInitialData(true);
    }
  };

  return (
    <form onSubmit={handleFetchData} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>Enter resource URL</Label>
        <Input
          placeholder="http://designlib.com"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          type="url"
          required
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Fetching resource details..." : "Next"}{" "}
        {isPending ? (
          <Loader2 className="w-4 h-4 ml-2 text-inherit animate-spin" />
        ) : (
          <ArrowRightIcon className="w-4 h-4 ml-2 text-inherit" />
        )}
      </Button>
    </form>
  );
}

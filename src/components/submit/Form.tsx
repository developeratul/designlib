"use client";

import { fetchResourceData } from "@/actions/resource.action";
import { submitResourceForm } from "@/app/(protected)/submit/constants/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StorageBucket } from "@/constants/supabase";
import { getFileUrl } from "@/helpers/supabase";
import { Category } from "@/types";
import { Database } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, FormEventHandler, SetStateAction, useMemo, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function SubmitResourceForm(props: { categories: Category[] }) {
  const { categories } = props;
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

  const thumbnailPath = form.watch("thumbnailPath");
  const thumbnailPreviewUrl = useMemo(() => {
    if (thumbnailPath) {
      return getFileUrl(StorageBucket.ResourceThumbnails, thumbnailPath);
    }
    return "";
  }, [thumbnailPath]);

  if (!hasFetchedInitialData) {
    return <FetchInitialData form={form} setFetchedInitialData={setFetchedInitialData} />;
  }

  const handleThumbnailChange = () => {};

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <Label>Thumbnail image</Label>
          <Image
            src={thumbnailPreviewUrl}
            alt="Resource thumbnail image"
            width={1600}
            height={900}
            className="w-full border rounded-md"
          />
          <Input type="file" onChange={handleThumbnailChange} />
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
                <Input placeholder="design-lib" {...field} />
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
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function FetchInitialData(props: {
  form: UseFormReturn<z.infer<typeof submitResourceForm>>;
  setFetchedInitialData: Dispatch<SetStateAction<boolean>>;
}) {
  const { form, setFetchedInitialData } = props;
  const supabase = createClientComponentClient<Database>();
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
      const { title, description, ogImageUrl } = await mutateAsync(url);

      let ogImagePath = "";

      if (ogImageUrl) {
        const res = await axios.get(ogImageUrl, { responseType: "blob" });
        const { error, data } = await supabase.storage
          .from(StorageBucket.ResourceThumbnails)
          .upload(`${uuid()}.jpg`, res.data);

        if (error) {
          return toast.error(error.message);
        }

        ogImagePath = data.path;
      }

      form.setValue("link", url);
      form.setValue("title", title);
      form.setValue("slug", slugify(title));
      form.setValue("description", description);
      form.setValue("thumbnailPath", ogImagePath);

      toast.success("Successfully fetched data from the URL");
      setFetchedInitialData(true);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setPending(false);
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

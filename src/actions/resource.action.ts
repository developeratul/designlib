"use server";
import { submitResourceForm } from "@/app/submit/constants";
import { StorageBucket } from "@/constants/supabase";
import { BAD_REQUEST_ACTION } from "@/lib/exceptions";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import axios, { AxiosError } from "axios";
import cheerio from "cheerio";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { z } from "zod";

export async function fetchResourceData(url: string) {
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    const response = await axios.get(url);

    // Load HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract page title
    const title = $("title").text();

    // Extract meta description
    const description = $('meta[name="description"]').attr("content") || "";

    // Extract og:image URL
    const ogImageUrl = $('meta[property="og:image"]').attr("content") || "";

    let ogImagePath;

    if (ogImageUrl) {
      const res = await axios.get(ogImageUrl, { responseType: "arraybuffer" });
      const { error, data } = await supabase.storage
        .from(StorageBucket.ResourceThumbnails)
        .upload(`${uuid()}.jpg`, res.data);

      if (error) {
        throw new Error(error.message);
      }

      ogImagePath = data.path;
    }

    return {
      title,
      description,
      ogImagePath,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error("Could not fetch data from that URL");
    }
    throw err;
  }
}

export async function submitResource(data: z.infer<typeof submitResourceForm>) {
  const parsedBody = submitResourceForm.safeParse(data);

  if (!parsedBody.success) {
    throw BAD_REQUEST_ACTION("Invalid data provided");
  }

  const supabase = createServerActionClient<Database>({ cookies });

  const userQuery = await supabase.auth.getUser();

  const { categoryId, link, slug, title, description, thumbnailPath } = parsedBody.data;

  const existingSlugQuery = await supabase
    .from("resources")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existingSlugQuery.data?.id) {
    throw new Error("This slug is already taken for another resource");
  }

  const existingLinkQuery = await supabase
    .from("resources")
    .select("id")
    .eq("link", link)
    .maybeSingle();

  if (existingLinkQuery.data?.id) {
    throw new Error("This link is already taken for another resource");
  }

  const resourceInsertQuery = await supabase
    .from("resources")
    .insert({
      category_id: Number(categoryId),
      link,
      slug,
      title,
      description,
      thumbnailPath,
      user_id: userQuery.data.user?.id,
    })
    .select("id,slug,user_id")
    .single();

  if (resourceInsertQuery.error) {
    throw new Error(resourceInsertQuery.error.message);
  }

  return resourceInsertQuery.data;
}

export async function getResourceBySlug(slug: string) {
  const supabase = createServerActionClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("resources")
    .select("*,category:categories(*)")
    .eq("isApproved", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getSimilarResources(currentResourceSlug: string) {
  const supabase = createServerActionClient<Database>({ cookies });

  const resource = await getResourceBySlug(currentResourceSlug);

  if (!resource) {
    throw new Error("Resource not found");
  }

  const { data, error } = await supabase
    .from("resources")
    .select("*,category:categories(*)")
    .eq("isApproved", true)
    .eq("category_id", resource.category_id || "")
    .neq("slug", currentResourceSlug);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

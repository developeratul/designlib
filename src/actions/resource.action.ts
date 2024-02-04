"use server";
import { submitResourceForm } from "@/app/submit/constants";
import { BAD_REQUEST_ACTION } from "@/lib/exceptions";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import axios, { AxiosError } from "axios";
import cheerio from "cheerio";
import { cookies } from "next/headers";
import { z } from "zod";

export async function fetchResourceData(url: string) {
  try {
    const response = await axios.get(url);

    // Load HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract page title
    const title = $("title").text();

    // Extract meta description
    const description = $('meta[name="description"]').attr("content") || "";

    // Extract og:image URL
    const ogImageUrl = $('meta[property="og:image"]').attr("content") || "";

    return {
      title,
      description,
      ogImageUrl,
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

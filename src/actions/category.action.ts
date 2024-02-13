"use server";

import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getAllCategories() {
  const supabase = createServerActionClient<Database>({ cookies });

  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createServerActionClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("categories")
    .select("*,resources(*,user:users(*))")
    .eq("resources.isApproved", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

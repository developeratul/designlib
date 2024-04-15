"use server";

import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getAllCategories(includeOther = false) {
  const supabase = createServerActionClient<Database>({ cookies });

  let query = supabase.from("categories").select("*").order("created_at");

  if (!includeOther) {
    query = query.neq("slug", "other");
  }

  const { data, error } = await query;

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
    .order("isFeatured", { referencedTable: "resources", ascending: false })
    .order("created_at", { referencedTable: "resources" })
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

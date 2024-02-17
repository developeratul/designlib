"use server";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getPublicUserDetails(username: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userQuery = await supabase
    .from("users")
    .select("id,username,display_name,bio,avatarPath,resources(*)")
    .eq("username", username)
    .maybeSingle();

  if (userQuery.error) {
    throw new Error(userQuery.error.message);
  }

  return userQuery.data;
}

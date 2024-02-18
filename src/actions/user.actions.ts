"use server";
import { updateProfileDetailsFormSchema } from "@/app/(onboarding-required)/u/[username]/constants";
import { profileDetailsFormSchema } from "@/app/auth/onboarding/constants";
import { BAD_REQUEST_ACTION, NOT_FOUND_ACTION, UNAUTHORIZED_ACTION } from "@/lib/exceptions";
import { Database } from "@/types/supabase";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

export async function getAuthUser() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const authQuery = await supabase.auth.getUser();

  if (!authQuery.data.user) {
    return null;
  }

  const userQuery = await supabase
    .from("users")
    .select("*")
    .eq("id", authQuery.data.user.id)
    .maybeSingle();

  if (userQuery.error) {
    throw new Error(userQuery.error.message);
  }

  return userQuery.data;
}

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

export async function updateProfileDetails(data: z.infer<typeof updateProfileDetailsFormSchema>) {
  const supabase = createServerActionClient<Database>({ cookies });

  const authQuery = await supabase.auth.getUser();

  if (!authQuery.data.user) {
    throw UNAUTHORIZED_ACTION();
  }

  const parsedBody = profileDetailsFormSchema.safeParse(data);

  if (!parsedBody.success) {
    throw BAD_REQUEST_ACTION("Invalid Request Body");
  }

  const userQuery = await supabase
    .from("users")
    .select("id")
    .eq("id", authQuery.data.user.id)
    .maybeSingle();

  if (userQuery.error) {
    throw new Error(userQuery.error.message);
  }

  if (!userQuery.data) {
    throw NOT_FOUND_ACTION("User not found");
  }

  const updateQuery = await supabase
    .from("users")
    .update({
      ...parsedBody.data,
    })
    .eq("id", userQuery.data.id)
    .select("username")
    .single();

  if (updateQuery.error) {
    throw new Error(updateQuery.error.message);
  }

  return updateQuery.data.username;
}

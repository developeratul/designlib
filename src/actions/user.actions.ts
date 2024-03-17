"use server";
import { updateProfileDetailsFormSchema } from "@/app/(app)/u/[username]/constants";
import { onboardingFormSchema } from "@/app/auth/onboarding/constants";
import { StorageBucket } from "@/constants/supabase";
import { BAD_REQUEST_ACTION, NOT_FOUND_ACTION, UNAUTHORIZED_ACTION } from "@/lib/exceptions";
import { Database } from "@/types/supabase";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
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
    .eq("resources.isApproved", true)
    .order("isFeatured", { referencedTable: "resources", ascending: false })
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

  const parsedBody = onboardingFormSchema.safeParse(data);

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

export async function uploadUserAvatarFromUrl(url: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const authQuery = await supabase.auth.getUser();

  if (!authQuery.data.user) {
    throw UNAUTHORIZED_ACTION();
  }

  const res = await axios.get(url, { responseType: "arraybuffer" });
  const { error, data } = await supabase.storage
    .from(StorageBucket.Avatars)
    .upload(`${uuid()}.jpg`, res.data, { contentType: "image/jpg" });

  if (error) {
    throw new Error(error.message);
  }

  return data.path;
}

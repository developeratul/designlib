"use server";
import { profileDetailsFormSchema } from "@/app/auth/onboarding/constants";
import { usernameFieldSchema } from "@/constants";
import { BAD_REQUEST_ACTION, UNAUTHORIZED_ACTION } from "@/lib/exceptions";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

export async function checkUsernameAvailability(username: string) {
  const supabase = createServerActionClient<Database>({ cookies });

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    throw UNAUTHORIZED_ACTION();
  }

  const parsedUsername = usernameFieldSchema.safeParse(username);

  if (!parsedUsername.success) {
    throw BAD_REQUEST_ACTION("Invalid username");
  }

  const userQuery = await supabase
    .from("users")
    .select("username")
    .eq("username", parsedUsername.data)
    .single();

  if (userQuery.data && !userQuery.error) {
    return { available: false };
  }

  return { available: true };
}

export async function submitProfileDetails(data: z.infer<typeof profileDetailsFormSchema>) {
  const supabase = createServerActionClient<Database>({ cookies });

  const userQuery = await supabase.auth.getUser();

  if (!userQuery.data.user) {
    throw UNAUTHORIZED_ACTION();
  }

  const parsedBody = profileDetailsFormSchema.safeParse(data);

  if (!parsedBody.success) {
    throw BAD_REQUEST_ACTION("Invalid Request Body");
  }

  const { display_name, username, avatarPath, bio } = parsedBody.data;

  const insertQuery = await supabase
    .from("users")
    .insert({
      id: userQuery.data.user.id,
      username,
      display_name,
      email: userQuery.data.user.email,
      bio,
      avatarPath,
      isOnboarded: true,
      role: "USER",
    })
    .select("username")
    .single();

  if (insertQuery.error) {
    throw new Error(insertQuery.error.message);
  }

  return insertQuery.data;
}

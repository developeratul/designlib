import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect("/auth/login");
  }

  const userQuery = await supabase.from("users").select("*").eq("id", data.user.id).maybeSingle();

  if (!userQuery.data?.isOnboarded) {
    return redirect("/auth/onboarding");
  }

  return redirect(`/u/${userQuery.data.username}`);
}

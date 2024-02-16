import { AppProps } from "@/types";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout(props: AppProps) {
  const { children } = props;
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect("/auth/login");
  }

  const userQuery = await supabase.from("users").select("*").eq("id", data.user.id).maybeSingle();

  if (!userQuery.data) {
    return redirect("/auth/onboarding");
  }

  return children;
}

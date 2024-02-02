import { AppProps } from "@/types";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout(props: AppProps) {
  const { children } = props;
  const supabase = createServerComponentClient<Database>({ cookies });
  const sessionQuery = await supabase.auth.getSession();

  if (!sessionQuery.data.session) {
    return redirect("/auth/login");
  }

  const { session } = sessionQuery.data;

  const userQuery = await supabase.from("users").select("*").eq("id", session.user.id).single();

  if (!userQuery.data) {
    return redirect("/auth/onboarding");
  }

  return children;
}

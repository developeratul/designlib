import LandingFooter from "@/components/layout/landing/Footer";
import NavBar from "@/components/layout/landing/NavBar";
import { AppProps } from "@/types";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LandingPageLayout(props: AppProps) {
  const { children } = props;
  const supabase = createServerComponentClient<Database>({ cookies });
  const sessionQuery = await supabase.auth.getSession();

  if (sessionQuery.data.session) {
    return redirect("/categories");
  }

  return (
    <div>
      <NavBar />
      {children}
      <LandingFooter />
    </div>
  );
}

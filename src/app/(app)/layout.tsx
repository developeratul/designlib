import { getAuthUser } from "@/actions/user.actions";
import SideBar from "@/components/layout/app/SideBar";
import TopBar from "@/components/layout/app/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppProps } from "@/types";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OnboardingRequiredLayout(props: AppProps) {
  const { children } = props;
  const supabase = createServerComponentClient<Database>({ cookies });
  const sessionQuery = await supabase.auth.getSession();
  const userQuery = await supabase
    .from("users")
    .select("*")
    .eq("id", sessionQuery.data.session?.user.id || "")
    .maybeSingle();

  if (sessionQuery.data.session && !userQuery.data) {
    return redirect("/auth/onboarding");
  }

  const user = await getAuthUser();

  return (
    <div className="flex flex-col w-full h-full">
      <TopBar user={user} />
      <div className="w-full flex-1 h-full overflow-hidden flex gap-0 items-stretch">
        <SideBar user={user} />
        <ScrollArea className="w-full min-h-full">
          <div className="w-full h-full">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

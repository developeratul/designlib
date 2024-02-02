import ProfileDetailsForm from "@/components/auth/onboarding/ProfileDetailsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect("/auth/login");
  }

  const dbUserQuery = await supabase
    .from("users")
    .select("username")
    .eq("id", data.user.id)
    .single();

  if (dbUserQuery.data?.username) {
    return redirect(`/${dbUserQuery.data.username}`);
  }

  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>Welcome to DesignLib community!</CardTitle>
          <CardDescription>
            Let&apos;s get you started with your account. Fill in the form below and we&apos;ll get
            you set up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileDetailsForm
            providedUserData={{
              display_name: data.user.user_metadata.full_name,
              avatarUrl: data.user.user_metadata.avatar_url,
            }}
          />
        </CardContent>
      </Card>
    </main>
  );
}

import { getAllCategories } from "@/actions/category.action";
import SubmitResourceForm from "@/components/submit/Form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SubmitResourcePage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const categories = await getAllCategories();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const dbUserQuery = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user?.id)
      .maybeSingle();
    if (!dbUserQuery.data?.isOnboarded) {
      return redirect("/auth/onboarding?next=submit");
    }
  }
  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>Submit new Resource</CardTitle>
          <CardDescription>
            Contribute to the community by submitting a new resource that you find useful.
            We&apos;ll look into and approve it.
            {!data.user && (
              <b>
                <br />
                Before submitting, we recommend you to{" "}
                <Link href="/auth/login">
                  <Button variant="link" className="h-auto px-0 py-0">
                    login
                  </Button>
                </Link>{" "}
                into your account to become an author of this resource.
              </b>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmitResourceForm categories={categories} />
        </CardContent>
      </Card>
    </main>
  );
}

export const dynamic = "force-dynamic";

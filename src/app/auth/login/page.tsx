"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const supabase = createClientComponentClient<Database>();
  const handleLoginWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to submit resource, create listings and more!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-2">
            <Button variant="outline">Login with Google</Button>
            <Button variant="outline" onClick={handleLoginWithGitHub}>
              Login with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

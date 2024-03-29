"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/env.mjs";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const supabase = createClientComponentClient<Database>();
  const handleLoginWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });
  };
  const handleLoginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });
  };
  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to submit and bookmark resources, create a public profile and more coming!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-2">
            <Button variant="secondary" onClick={handleLoginWithGitHub}>
              Login with GitHub
            </Button>
            <Button onClick={handleLoginWithGoogle} variant="secondary">
              Login with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

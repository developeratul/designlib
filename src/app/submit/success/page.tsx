"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";
import { CheckCircleIcon, InfoIcon, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SubmissionSuccessfulPage() {
  const supabase = createClientComponentClient<Database>();
  const { isLoading, data } = useQuery({
    queryKey: ["get-auth-user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) return null;
      const { user } = data;
      const dbUserQuery = await supabase
        .from("users")
        .select("display_name,username")
        .eq("id", user.id)
        .single();
      if (dbUserQuery.error) return null;
      return dbUserQuery.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-full flex py-12 justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[450px]">
        <CardContent className="py-12 px-8">
          <div className="w-full flex flex-col justify-center items-center gap-6 text-center">
            <CheckCircleIcon className="w-12 h-12 text-green-300" />
            <div className="space-y-2">
              <h3 className={cn("text-2xl text-white font-semibold", manrope.className)}>
                Submission Successful
              </h3>
              <p className="text-base text-foreground">
                You submission has been received. We appreciate your contribution to the community.
              </p>
            </div>
            <Link href="/" className="w-full">
              <Button className="w-full">Back to Home</Button>
            </Link>
            {data && (
              <Alert className="text-left break-words" variant="info">
                <InfoIcon className="w-4 h-4 text-inherit" />
                <AlertDescription>
                  Once this resource gets approved, you will become the author of it,{" "}
                  <b className="text-primary">@{data?.username}</b>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

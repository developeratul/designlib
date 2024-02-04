"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorPage(props: { error: Error; reset: () => void }) {
  const { error, reset } = props;
  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>Oops! We got an error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="pre-wrap text-destructive">{error.message}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

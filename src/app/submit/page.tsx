import { getAllCategories } from "@/actions/category.action";
import SubmitResourceForm from "@/components/submit/Form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function SubmitResourcePage() {
  const categories = await getAllCategories();
  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>Submit new Resource</CardTitle>
          <CardDescription>
            Contribute to the community by submitting a new resource that you find useful.
            We&apos;ll look into and approve it.
            <br />
            Before submitting, we recommend you to{" "}
            <Link href="/auth/login">
              <Button variant="link" className="h-auto px-0 py-0">
                login
              </Button>
            </Link>{" "}
            into your account to become an author of this resource.
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

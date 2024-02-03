import { getAllCategories } from "@/actions/category.action";
import SubmitResourceForm from "@/components/submit/Form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SubmitResourcePage() {
  const categories = await getAllCategories();
  return (
    <main className="w-full flex justify-center py-24">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>Submit new Resource</CardTitle>
          <CardDescription>
            Contribute to the community by submitting a new resource that you find useful. We will
            look into and approve it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmitResourceForm categories={categories} />
        </CardContent>
      </Card>
    </main>
  );
}

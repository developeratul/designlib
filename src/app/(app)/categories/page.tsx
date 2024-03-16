import { getAllCategories } from "@/actions/category.action";
import { redirect } from "next/navigation";

export default async function CategoriesRootPage() {
  const categories = await getAllCategories();

  if (!categories.length && !categories[0]) {
    return (
      <main>
        <div className="container">
          <p>No categories found</p>
        </div>
      </main>
    );
  }

  const category = categories[0];

  return redirect(`/categories/${category?.slug}`);
}

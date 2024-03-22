import ResourcesGrid from "@/components/resources/Grid";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ResourceWithMeta } from "@/types";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function BookmarksPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect("/auth/login");
  }

  const bookmarksQuery = await supabase
    .from("bookmarks")
    .select("*,resource:resources(*,user:users(*))")
    .eq("userId", data.user.id)
    .order("created_at", { ascending: false });

  if (bookmarksQuery.error) {
    throw new Error(bookmarksQuery.error.message);
  }

  const bookmarkedResources = bookmarksQuery.data
    .filter((bookmark) => bookmark !== null)
    .filter((bookmark) => bookmark.resource !== null)
    .map((bookmark) => bookmark.resource);

  return (
    <main>
      <div className="container py-12">
        <div className="space-y-8">
          <h1 className={cn("text-3xl text-white font-semibold", manrope.className)}>Bookmarks</h1>
          <ResourcesGrid
            bookmarks={bookmarksQuery.data}
            resources={bookmarkedResources as ResourceWithMeta[]}
            emptyMessage="You haven't bookmarked any resource yet"
          />
        </div>
      </div>
    </main>
  );
}

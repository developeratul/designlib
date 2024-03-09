import { getAllBookmarksOfAuthUser, getPublicFeaturedResources } from "@/actions/resource.action";
import FeaturedResourcesSlider from "@/components/landing/FeaturedResourcesSlider";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";

export default async function Home() {
  const featuredResources = await getPublicFeaturedResources();
  const bookmarks = await getAllBookmarksOfAuthUser();

  return (
    <main>
      <Hero />
      <FeaturedResourcesSlider data={featuredResources} bookmarks={bookmarks} />
      <Features />
    </main>
  );
}

export const dynamic = "force-dynamic";

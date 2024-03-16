import {
  getAllBookmarksOfAuthUser,
  getPublicFeaturedResources,
  getTotalResourceCount,
} from "@/actions/resource.action";
import FeaturedResourcesSlider from "@/components/landing/FeaturedResourcesSlider";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import SharingProcess from "@/components/landing/SharingProcess";

export default async function Home() {
  const featuredResources = await getPublicFeaturedResources();
  const bookmarks = await getAllBookmarksOfAuthUser();
  const totalResourcesCount = await getTotalResourceCount();

  return (
    <main>
      <Hero />
      <div className="space-y-20 mb-24">
        <FeaturedResourcesSlider
          totalResourceCount={totalResourcesCount}
          data={featuredResources}
          bookmarks={bookmarks}
        />
        <Features />
        <SharingProcess />
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";

import FeaturedResourcesSlider from "@/components/landing/FeaturedResourcesSlider";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import SharingProcess from "@/components/landing/SharingProcess";

export default async function Home() {
  return (
    <main>
      <Hero />
      <div className="space-y-20 mb-24">
        <FeaturedResourcesSlider />
        <Features />
        <SharingProcess />
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";

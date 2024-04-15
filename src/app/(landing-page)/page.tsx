import CTA from "@/components/landing/CTA";
import FeaturedResourcesSlider from "@/components/landing/FeaturedResourcesSlider";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import SharingProcess from "@/components/landing/SharingProcess";
import Solution from "@/components/landing/Solution";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  return (
    <main>
      <Hero />
      <div className="space-y-24 mb-24">
        <FeaturedResourcesSlider />
        <Problem />
        <div className="container">
          <Separator />
        </div>
        <Solution />
        <div className="container">
          <Separator />
        </div>
        <Features />
        <div className="container">
          <Separator />
        </div>
        <SharingProcess />
      </div>
      <CTA />
    </main>
  );
}

export const dynamic = "force-dynamic";

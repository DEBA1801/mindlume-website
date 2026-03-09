"use client";

import { useEffect, useState } from "react";
import FeatureSlider from "@/components/home/FeatureSlider";
import CtaSection from "@/components/home/CtaSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FooterSection from "@/components/home/FooterSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import Testimonials from "@/components/home/Testimonials";
import WaitlistModal from "@/components/WaitlistModal";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch("/api/waitlist", { method: "GET" });
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (typeof data?.count === "number") {
          setWaitlistCount(data.count);
        }
      } catch {
        // Keep UI functional even if the counter request fails.
      }
    };

    fetchWaitlistCount();
  }, []);

  return (
    <main className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      <HeroSection
        onOpenWaitlist={() => setIsWaitlistOpen(true)}
        waitlistCount={waitlistCount}
      />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />

      <div className="mt-20 mb-20">
        <FeatureSlider />
      </div>

      <Testimonials />

      <CtaSection onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <FooterSection />
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </main>
  );
}

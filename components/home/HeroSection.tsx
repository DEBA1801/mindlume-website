"use client";

import { motion } from "framer-motion";
import ProductMock from "@/components/home/ProductMock";

type HeroSectionProps = {
  onOpenWaitlist: () => void;
  waitlistCount?: number | null;
};

export default function HeroSection({
  onOpenWaitlist,
  waitlistCount,
}: HeroSectionProps) {
  return (
    <section className="bg-black relative overflow-hidden py-28 text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[540px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-100/70 via-white to-indigo-100/70 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/75 to-white" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight mb-6"
        >
          From scattered thoughts to connected knowledge
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Ideas often live in fragments - notes, reminders, half-finished
          thoughts. MindLume turns them into a connected system where ideas grow
          together and meaning emerges over time.
        </motion.p>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={onOpenWaitlist}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Join Waitlist
          </button>

          <a
            href="#ideas"
            className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
        <p className="text-md text-gray-700">
          Join the waitlist — early users get priority access.
          {typeof waitlistCount === "number"
            ? ` ${waitlistCount.toLocaleString()} people already joined.`
            : ""}
        </p>

        <motion.div className="mt-16 hover:-translate-y-1 transition duration-300">
          <ProductMock />
        </motion.div>
      </div>
    </section>
  );
}

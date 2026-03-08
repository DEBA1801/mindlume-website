"use client";

import { motion, type Variants } from "framer-motion";
import { Brain, FolderTree, Search, type LucideIcon } from "lucide-react";

type FeatureHighlight = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconTone: string;
};

const featureHighlights: FeatureHighlight[] = [
  {
    title: "Think with AI",
    description: "Develop ideas and retrieve insights instantly.",
    icon: Brain,
    iconTone: "from-indigo-500/25 to-violet-500/20",
  },
  {
    title: "Smart Knowledge Library",
    description: "Develop ideas and retrieve insights instantly.",
    icon: FolderTree,
    iconTone: "from-cyan-500/25 to-blue-500/20",
  },
  {
    title: "Ask anything across your ideas",
    description: "Develop ideas and retrieve insights instantly.",
    icon: Search,
    iconTone: "from-fuchsia-500/25 to-pink-500/20",
  },
];

const featureIconVariants: Variants = {
  rest: {
    rotateY: 0,
  },
  hover: {
    rotateY: 180,
    transition: {
      duration: 0.55,
      ease: "easeInOut",
    },
  },
};

function FeatureCard({ feature }: { feature: FeatureHighlight }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative overflow-hidden bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition text-center"
    >
      <motion.div
        variants={featureIconVariants}
        style={{
          transformPerspective: 700,
          transformStyle: "preserve-3d",
        }}
        className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.iconTone} ring-1 ring-white/80 shadow-sm transition-shadow duration-300 group-hover:shadow-md`}
      >
        <div
          className="relative h-7 w-7"
          style={{ transformStyle: "preserve-3d" }}
        >
          <feature.icon
            className="absolute inset-0 h-7 w-7 text-gray-800"
            style={{ backfaceVisibility: "hidden" }}
          />
          <feature.icon
            className="absolute inset-0 h-7 w-7 text-gray-800"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          />
        </div>
      </motion.div>

      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Powerful features for better thinking
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:hidden">
          {featureHighlights.map((feature) => (
            <div
              key={`mobile-${feature.title}`}
              className="min-w-[82%] snap-center"
            >
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-10">
          {featureHighlights.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

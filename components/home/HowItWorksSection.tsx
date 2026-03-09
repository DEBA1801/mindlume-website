"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import {
  Lightbulb,
  FolderTree,
  Brain,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type WorkflowFeature = {
  title: string;
  description: string;
  bg: string;
  icon: LucideIcon;
  preview?: ReactNode;
};

const workflowFeatures: WorkflowFeature[] = [
  {
    title: "1. Capture Ideas",
    description:
      "Write thoughts instantly as they appear. Mindlume becomes a home for every idea. Where they can grow and connect with other knowledge over time.",
    bg: "from-indigo-200 via-purple-100 to-pink-200",
    icon: Lightbulb,
  },
  {
    title: "2. Organize Knowledge",
    description:
      "Store research, articles, notes, and insights in one intelligent workspace. Mindlume helps you connect the dots and discover insights across your knowledge.",
    bg: "from-blue-200 via-cyan-100 to-indigo-200",
    icon: FolderTree,
  },
  {
    title: "3. Think with AI",
    description:
      "Explore ideas through conversations with your AI thinking partner. Get instant feedback, brainstorm new angles, and deepen your thinking with AI.",
    bg: "from-purple-200 via-indigo-100 to-blue-200",
    icon: Brain,
  },
  {
    title: "4. Discover Insights",
    description:
      "Mindlume connects knowledge and surfaces insights you might otherwise miss. It helps you see patterns, generate new ideas, and think deeper across your knowledge.",
    bg: "from-orange-200 via-yellow-100 to-pink-200",
    icon: Sparkles,
  },
];

export default function HowItWorksSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["70vw", "100vw"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["24px", "0px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const gradientPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0% 0%", "100% 0%"],
  );
  const glowTextShadow = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "0 0 0px rgba(14, 165, 233, 0), 0 0 0px rgba(59, 130, 246, 0)",
      "0 0 12px rgba(100, 75, 17, 0), 0 0 28px rgb(243, 145, 54)",
    ],
  );
  const glowFilter = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(1) saturate(1)", "brightness(1.2) saturate(1.35)"],
  );

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="flex justify-center overflow-hidden"
    >
      <motion.div
        style={{ width, borderRadius, scale }}
        className="relative overflow-hidden shadow-xl"
      >
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 bg-gradient-to-br ${workflowFeatures[activeFeature].bg}`}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-24">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-900">
              How{" "}
              <motion.span
                style={{
                  backgroundPosition: gradientPosition,
                  backgroundSize: "220% 220%",
                  textShadow: glowTextShadow,
                  filter: glowFilter,
                }}
                className="inline-block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                MindLume
              </motion.span>{" "}
              Works
            </h2>

            <p className="text-gray-700 dark:text-gray-200 mt-4 text-lg">
              A simple workflow that captures ideas, organizes knowledge, and
              helps you think deeper with AI.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start">
            <div className="space-y-3">
              {workflowFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ x: 4 }}
                  className={`cursor-pointer rounded-xl px-5 py-4 transition ${
                    activeFeature === index
                      ? "bg-white dark:bg-gray-900 shadow-md"
                      : "bg-white/60 hover:bg-white/80 dark:bg-gray-900/60 dark:hover:bg-gray-900/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <h3 className="text-md font-semibold">{feature.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-3xl p-10 shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {workflowFeatures[activeFeature].title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {workflowFeatures[activeFeature].description}
              </p>

              {workflowFeatures[activeFeature].preview && (
                <div className="mt-8">
                  {workflowFeatures[activeFeature].preview}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

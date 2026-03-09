"use client";

import { motion } from "framer-motion";
import ProductMock from "@/components/home/ProductMock";

type HeroSectionProps = {
  onOpenWaitlist: () => void;
  waitlistCount?: number | null;
};

const connectionPaths = [
  "M80 170 C 260 90, 420 250, 620 170 S 1020 70, 1360 180",
  "M40 340 C 240 270, 420 420, 660 330 S 1040 220, 1410 350",
  "M120 520 C 320 430, 520 600, 760 500 S 1120 420, 1370 560",
  "M220 90 C 360 160, 520 80, 700 130 S 980 250, 1220 180",
];

const neuralNodes = [
  { x: 12, y: 24, size: 7, delay: 0.1 },
  { x: 28, y: 18, size: 8, delay: 0.7 },
  { x: 39, y: 31, size: 6, delay: 1.2 },
  { x: 53, y: 21, size: 9, delay: 0.4 },
  { x: 66, y: 36, size: 7, delay: 1.6 },
  { x: 78, y: 28, size: 6, delay: 0.9 },
  { x: 86, y: 44, size: 8, delay: 1.4 },
  { x: 22, y: 56, size: 7, delay: 1.8 },
  { x: 41, y: 61, size: 8, delay: 0.3 },
  { x: 58, y: 52, size: 6, delay: 1.1 },
  { x: 73, y: 66, size: 7, delay: 0.5 },
  { x: 89, y: 58, size: 6, delay: 1.9 },
];

const dataPulses = [
  { x: 8, y: 22, moveX: 240, moveY: -10, duration: 8, delay: 0.2 },
  { x: 20, y: 53, moveX: 280, moveY: -40, duration: 10, delay: 1 },
  { x: 34, y: 30, moveX: 240, moveY: 30, duration: 9, delay: 1.8 },
  { x: 56, y: 44, moveX: 260, moveY: -20, duration: 8.5, delay: 0.7 },
  { x: 70, y: 62, moveX: 220, moveY: -35, duration: 9.5, delay: 1.4 },
];

export default function HeroSection({
  onOpenWaitlist,
  waitlistCount,
}: HeroSectionProps) {
  return (
    <section className="bg-black dark:bg-gray-950 relative overflow-hidden py-28 text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-30 dark:opacity-50 [mask-image:radial-gradient(circle_at_center,black_45%,transparent_92%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,41,59,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>

        <svg
          className="absolute inset-0 h-full w-full opacity-70 dark:opacity-80"
          viewBox="0 0 1440 760"
          preserveAspectRatio="none"
          fill="none"
        >
          {connectionPaths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              stroke="rgba(56, 189, 248, 0.35)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="6 10"
              initial={{ pathLength: 0.25, opacity: 0.25 }}
              animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 10 + index * 1.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />
          ))}
        </svg>

        {neuralNodes.map((node) => (
          <motion.span
            key={`${node.x}-${node.y}`}
            className="absolute rounded-full bg-sky-300/70 dark:bg-cyan-200/70 shadow-[0_0_22px_rgba(56,189,248,0.65)]"
            style={{
              width: node.size,
              height: node.size,
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.35, 0.95, 0.35],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
          />
        ))}

        {dataPulses.map((pulse) => (
          <motion.span
            key={`${pulse.x}-${pulse.y}`}
            className="absolute h-2.5 w-2.5 rounded-full bg-cyan-200/90 shadow-[0_0_26px_rgba(103,232,249,0.95)]"
            style={{ left: `${pulse.x}%`, top: `${pulse.y}%` }}
            animate={{
              x: [0, pulse.moveX],
              y: [0, pulse.moveY],
              opacity: [0, 0.9, 0],
              scale: [0.85, 1, 0.85],
            }}
            transition={{
              duration: pulse.duration,
              repeat: Infinity,
              ease: "linear",
              delay: pulse.delay,
            }}
          />
        ))}

        <div className="absolute left-1/2 top-[-220px] h-[540px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-100/70 via-white to-indigo-100/70 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/75 to-white dark:from-gray-950/40 dark:via-gray-950/70 dark:to-gray-950" />
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
          className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto mb-10"
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
            className="border border-gray-300 dark:border-white/20 px-6 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            Learn More
          </a>
        </div>
        <p className="text-md text-gray-700 dark:text-gray-300">
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

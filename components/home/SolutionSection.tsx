"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SolutionSection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/solution.png"
            alt="MindLume organizing ideas into connected knowledge"
            width={1200}
            height={800}
            sizes="(max-width: 768px) 92vw, 50vw"
            className="h-auto w-full"
          />
        </motion.div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Your ideas. Organized and expanded by AI
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg">
            MindLume helps you capture ideas, organize knowledge, and explore
            your thinking with AI that understands the context of your notes.
          </p>
        </div>
      </div>
    </section>
  );
}

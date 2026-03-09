"use client";

import { motion } from "framer-motion";

export default function SolutionSection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="/images/solution.png"
          className="rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

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

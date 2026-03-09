"use client";

import { useState } from "react";
import WaitlistModal from "@/components/WaitlistModal";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <main className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      {/* HERO */}
      <section className="relative py-32">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[1200px] h-[1200px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-30 blur-[200px] rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
            Your AI Thinking Partner
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Mindlume helps you capture ideas, organize knowledge, and explore
            deeper thinking using AI.
          </p>

          <div className="flex justify-center gap-4 mb-16">
            <button
              onClick={() => setIsWaitlistOpen(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Join Waitlist
            </button>

            <button className="border border-gray-300 dark:border-white/20 px-6 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition">
              Learn More
            </button>
          </div>

          <img
            src="https://placehold.co/1200x600"
            className="rounded-2xl shadow-xl mx-auto"
          />
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 text-center px-6">
        <h2 className="text-3xl font-semibold mb-6">
          Your ideas deserve a better place
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
          Every day you encounter ideas, insights, and inspiration. But they end
          up scattered across notes, bookmarks, screenshots, and documents.
        </p>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg mt-4">
          Over time, valuable knowledge becomes impossible to find and even
          harder to develop into meaningful ideas.
        </p>
      </section>

      {/* SOLUTION */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl font-semibold mb-6">Meet Mindlume</h2>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
          Mindlume is a personal knowledge system built for thinking. Capture
          ideas, organize knowledge, and develop better thinking through
          intelligent AI conversations.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 px-6">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Designed for better thinking
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 border border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-gray-950">
            <h3 className="text-xl font-semibold mb-3">AI Thinking Partner</h3>

            <p className="text-gray-600 dark:text-gray-300">
              Explore ideas with AI that asks thoughtful questions, challenges
              assumptions, and helps refine your thinking.
            </p>
          </div>

          <div className="p-6 border border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-gray-950">
            <h3 className="text-xl font-semibold mb-3">Knowledge Library</h3>

            <p className="text-gray-600 dark:text-gray-300">
              Store ideas, notes, research, and articles in a personal knowledge
              system designed for clarity.
            </p>
          </div>

          <div className="p-6 border border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-gray-950">
            <h3 className="text-xl font-semibold mb-3">AI Knowledge Search</h3>

            <p className="text-gray-600 dark:text-gray-300">
              Ask questions about your knowledge and instantly retrieve insights
              from everything you&apos;ve saved.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-16">How Mindlume Works</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="font-semibold mb-3 text-lg">Capture</h3>

            <p className="text-gray-600 dark:text-gray-300">
              Save ideas, insights, research, and inspiration.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-lg">Organize</h3>

            <p className="text-gray-600 dark:text-gray-300">
              Mindlume automatically structures and summarizes knowledge.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-lg">Think</h3>

            <p className="text-gray-600 dark:text-gray-300">
              Explore ideas through AI conversations that expand thinking.
            </p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 text-center px-6">
        <h2 className="text-3xl font-semibold mb-6">
          Software that helps you think
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
          Mindlume is built on a simple belief: the most valuable tool you own
          is your mind. Software should help you develop ideas, connect
          knowledge, and think more clearly.
        </p>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl font-semibold mb-6">
          Be among the first to try Mindlume
        </h2>

        <div className="max-w-xl mx-auto">
          <button
            onClick={() => setIsWaitlistOpen(true)}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Join Waitlist
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-white/10">
        © 2026 Mindlume
      </footer>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </main>
  );
}

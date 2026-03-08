"use client";

import { motion } from "framer-motion";
import {
  BookMarked,
  FileText,
  ImageIcon,
  Network,
  type LucideIcon,
} from "lucide-react";

type ProblemCard = {
  title: string;
  icon: LucideIcon;
  tone: string;
};

export default function ProblemSection() {
  const problemCards: ProblemCard[] = [
    {
      title: "Notes Everywhere",
      icon: FileText,
      tone: "from-indigo-100 to-blue-100",
    },
    {
      title: "Bookmark Pileup",
      icon: BookMarked,
      tone: "from-cyan-100 to-sky-100",
    },
    {
      title: "Screenshot Chaos",
      icon: ImageIcon,
      tone: "from-violet-100 to-fuchsia-100",
    },
    {
      title: "Knowledge Fragmentation",
      icon: Network,
      tone: "from-orange-100 to-amber-100",
    },
  ];

  return (
    <section id="ideas" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-6 text-center text-3xl font-semibold">
          Your ideas are scattered everywhere
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:hidden">
          {problemCards.map((card) => (
            <motion.div
              key={`mobile-${card.title}`}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group min-w-[82%] snap-center rounded-2xl border bg-white p-5 shadow-sm text-center"
            >
              <motion.div
                whileHover={{ rotate: [0, -6, 4, 0] }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.tone}`}
              >
                <card.icon className="h-6 w-6 text-gray-700" />
              </motion.div>

              <h3 className="mb-2 font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-600">
                Valuable knowledge often ends up scattered across apps and
                tools.
              </p>
            </motion.div>
          ))}
        </div>

        <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problemCards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow:
                  "0 18px 40px rgba(15, 23, 42, 0.12), 0 4px 14px rgba(15, 23, 42, 0.08)",
              }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm text-center"
            >
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.tone}`}
              >
                <card.icon className="h-6 w-6 text-gray-700" />
              </div>

              <h3 className="mb-2 font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-600">
                Valuable knowledge often ends up scattered across apps and
                tools.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

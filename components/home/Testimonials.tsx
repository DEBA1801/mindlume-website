"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "MindLume helped me bring together ideas that were scattered across notes, bookmarks, and documents. Everything finally connects.",
    name: "Alex Chen",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    quote:
      "I use MindLume during meetings to capture thoughts quickly. The AI helps transform rough notes into clearer ideas.",
    name: "Sarah Patel",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    quote:
      "It feels like having a thinking partner that remembers everything I've written and helps me explore ideas deeper.",
    name: "Daniel Ruiz",
    role: "Researcher",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    quote:
      "MindLume changed how I organize knowledge. My ideas finally feel connected instead of scattered.",
    name: "Emily Carter",
    role: "Writer",
    avatar: "https://i.pravatar.cc/100?img=23",
  },
];

export default function Testimonials() {
  const SWIPE_THRESHOLD_PX = 50;
  const [index, setIndex] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  /* AUTO SCROLL */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function goToNext() {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }

  function goToPrevious() {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (!touchStartRef.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD_PX ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  }

  const active = testimonials[index];

  return (
    <section className="py-2 mb-20 flex justify-center">
      <div className="max-w-5xl w-full px-6 text-center">
        {/* HEADER */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Trusted by thinkers, founders, and researchers
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold mb-16">
          What early users are saying
        </h2>

        {/* TESTIMONIAL CARD */}
        <div
          className="relative flex justify-center touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl rounded-3xl p-10 text-left shadow-xl
            bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 text-white"
          >
            {/* QUOTE */}
            <p className="text-lg leading-relaxed mb-8">“{active.quote}”</p>

            {/* PROFILE */}
            <div className="flex items-center gap-4">
              <Image
                src={active.avatar}
                alt={`${active.name} avatar`}
                width={40}
                height={40}
                sizes="40px"
                className="h-10 w-10 rounded-full"
              />

              <div>
                <p className="font-semibold">{active.name}</p>
                <p className="text-sm opacity-80">{active.role}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DOT INDICATORS */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                index === i ? "bg-black dark:bg-white w-6" : "bg-gray-300 dark:bg-gray-700 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

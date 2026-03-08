"use client";

import { useState, useEffect, useRef, type TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Capture ideas while the conversation flows.",
    text: "Take quick notes during meetings, brainstorming sessions, or discussions. MindLume keeps everything organized so you can stay focused on the conversation instead of worrying about losing ideas.",
    bg: "from-indigo-500 via-purple-500 to-blue-500",
    image: "/images/meeting.jpg",
  },
  {
    title: "Turn a rough thought into a clearer idea.",
    text: "When an idea feels incomplete, ask MindLume for help. AI expands your thinking, suggests connections, and helps move your ideas forward.",
    bg: "from-blue-500 via-cyan-500 to-indigo-500",
    image: "/images/interconnected.jpg",
  },
  {
    title: "Bring structure to messy thinking.",
    text: "Start with scattered notes and gradually shape them into plans, outlines, and strategies. MindLume helps ideas evolve from early thoughts to meaningful direction.",
    bg: "from-purple-500 via-indigo-500 to-blue-500",
    image: "/images/structured-thoughts.jpg",
  },
  {
    title: "Rediscover ideas you forgot about.",
    text: "Sometimes your best ideas come from something you wrote months ago. MindLume helps you revisit past thinking and connect it with new insights.",
    bg: "from-cyan-500 via-blue-500 to-indigo-500",
    image: "/images/rediscover.jpg",
  },
];

export default function FeatureSlider() {
  const SLIDE_DURATION = 5000;
  const SWIPE_THRESHOLD_PX = 50;
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const lastFrameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  function goTo(i: number) {
    progressRef.current = 0;
    setProgress(0);
    setIndex(i);
  }

  function goToNext() {
    goTo((index + 1) % slides.length);
  }

  function goToPrevious() {
    goTo((index - 1 + slides.length) % slides.length);
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

  /* AUTO SLIDE + PROGRESS */
  useEffect(() => {
    if (!isPlaying) {
      lastFrameRef.current = null;
      return;
    }

    let rafId = 0;
    const tick = (timestamp: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = timestamp;
      }

      const delta = timestamp - lastFrameRef.current;
      lastFrameRef.current = timestamp;

      let nextProgress = progressRef.current + delta / SLIDE_DURATION;
      if (nextProgress >= 1) {
        nextProgress = 0;
        setIndex((prev) => (prev + 1) % slides.length);
      }

      progressRef.current = nextProgress;
      setProgress(nextProgress);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  return (
    <section id="mindlume-in-action" className="py-10 flex justify-center">
      <div className="max-w-6xl w-full px-6">
        <h2 className="text-5xl font-semibold mb-14 text-center">
          See MindLume in Action
        </h2>

        <div
          className="relative overflow-hidden rounded-3xl shadow-xl touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[420px] p-8 md:p-16 text-white"
            >
              <div
                className={`absolute inset-0 bg-gradient-40 ${slides[index].bg}`}
              />

              {slides[index].image && (
                <motion.div
                  key={`bg-${index}`}
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.03, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slides[index].image})` }}
                />
              )}

              <div className="absolute inset-0 bg-black/50" />

              <div className="relative z-10">
                <h3 className="text-3xl font-semibold mb-4">
                  {slides[index].title}
                </h3>

                <p className="max-w-md text-lg opacity-90">
                  {slides[index].text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLS */}
        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-full bg-gray-200 px-4 py-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  index === i
                    ? "w-12 bg-gray-500/35 overflow-hidden"
                    : "w-2 bg-gray-500/60 hover:bg-gray-500/80"
                }`}
              >
                {index === i && (
                  <motion.span
                    key={`${index}-${isPlaying ? "play" : "pause"}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-gray-700"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </button>
            ))}

            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? "Pause slider" : "Play slider"}
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

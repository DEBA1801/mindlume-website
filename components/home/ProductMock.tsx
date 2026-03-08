"use client";

import { useState, useEffect } from "react";

export default function ProductMock() {
  const aiResponse =
    "You could validate this idea by analyzing founder communities, search demand, startup forums, and indie hacker discussions to identify early signals of demand.";

  const MAX_LENGTH = 120;

  const truncatedText =
    aiResponse.length > MAX_LENGTH
      ? aiResponse.substring(0, MAX_LENGTH) + "..."
      : aiResponse;

  const [typedCount, setTypedCount] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const displayedText = truncatedText.slice(0, typedCount);
  const isTyping = typedCount < truncatedText.length;

  useEffect(() => {
    if (typedCount < truncatedText.length) {
      const timeout = setTimeout(() => {
        setTypedCount((prev) => prev + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [typedCount, truncatedText]);

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 450);

    return () => clearInterval(blink);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
      {/* Window Bar */}

      <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <div className="w-3 h-3 bg-green-400 rounded-full" />
        </div>

        <div className="text-sm text-gray-500 ml-4">Mindlume Workspace</div>
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[420px]">
        {/* LEFT PANEL — USER NOTES */}

        <div className="border-r p-6">
          <div className="text-lg font-semibold text-gray-700 mb-4">
            User Notes
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-700 leading-relaxed">
            <p>
              <span className="font-semibold">Idea:</span> Build an AI system
              that helps founders validate startup ideas quickly using market
              signals.
            </p>

            <p className="mt-3">
              <span className="font-semibold">Observation:</span> Many founders
              build products without validating real demand first.
            </p>

            <p className="mt-3">
              <span className="font-semibold">Goal:</span> Find signals that
              indicate real demand before building.
            </p>
          </div>
        </div>

        {/* MIDDLE PANEL — RESOURCES */}

        {/* MIDDLE PANEL — RESOURCES */}

        <div className="border-r bg-gray-50 p-6">
          <div className="text-lg font-semibold text-gray-700 mb-6">
            Resources
          </div>

          <div className="space-y-4">
            <div className="bg-white border rounded-xl px-4 py-3 text-sm text-gray-600 flex  hover:shadow-sm transition">
              🔗 Hackers discussion
            </div>

            <div className="bg-white border rounded-xl px-4 py-3 text-sm text-gray-600 flex hover:shadow-sm transition">
              📄 Market Research PDF
            </div>

            <div className="bg-white border rounded-xl px-4 py-3 text-sm text-gray-600 flex hover:shadow-sm transition">
              🖼 Screenshot of user feedback
            </div>

            <div className="bg-white border rounded-xl px-4 py-3 text-sm text-gray-600 flex hover:shadow-sm transition">
              🔗 Google Trends data
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — AI THINKING PARTNER */}

        <div className="flex h-full flex-col p-6">
          <div className="mb-4 text-lg font-semibold text-gray-700">
            AI Thinking Partner
          </div>

          {/* User Question */}

          <div className="mb-[10px] rounded-xl bg-gray-100 p-3 text-sm text-gray-700">
            Based on my notes and resources, how could I validate this idea?
          </div>

          {/* AI Response Area */}

          <div className="flex-1 bg-indigo-600 text-white rounded-xl p-6 text-sm leading-relaxed overflow-hidden flex items-center">
            <div className="w-full text-center">
              {displayedText}
              <span
                className={`ml-1 inline-block h-4 w-[2px] align-middle bg-white transition-opacity duration-150 ${
                  cursorVisible ? "opacity-100" : "opacity-0"
                } ${isTyping ? "shadow-[0_0_8px_rgba(255,255,255,0.9)]" : ""}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import WaitlistModal from "@/components/WaitlistModal";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bulbProgress, setBulbProgress] = useState(0);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navItems = [
    { name: "Ideas", href: "#ideas" },
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "MindLume in Action", href: "#mindlume-in-action" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setBulbProgress(Math.min(y / 120, 1));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      const storedTheme = localStorage.getItem("theme");
      const nextIsDark = storedTheme
        ? storedTheme === "dark"
        : mediaQuery.matches;
      setIsDark(nextIsDark);
      root.classList.toggle("dark", nextIsDark);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme") {
        updateTheme();
      }
    };

    updateTheme();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("themechange", updateTheme);
    mediaQuery.addEventListener("change", updateTheme);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("themechange", updateTheme);
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  const topColor = "rgb(255, 255, 255)";
  const scrolledLightColor = "rgb(17, 24, 39)";
  const scrolledDarkColor = "rgb(243, 244, 246)";
  const fixedScrolledColor = isDark ? scrolledDarkColor : scrolledLightColor;
  const bulbColor = scrolled ? fixedScrolledColor : topColor;
  const logoColor = scrolled ? fixedScrolledColor : topColor;
  const joinBgColor = isDark
    ? "rgb(255, 255, 255)"
    : `rgb(${Math.round(255 - 255 * bulbProgress)}, ${Math.round(255 - 255 * bulbProgress)}, ${Math.round(255 - 255 * bulbProgress)})`;
  const joinTextColor = isDark
    ? "rgb(17, 24, 39)"
    : `rgb(${Math.round(255 * bulbProgress)}, ${Math.round(255 * bulbProgress)}, ${Math.round(255 * bulbProgress)})`;
  const glowOpacity = 1 - bulbProgress;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/70 border-b border-black/10 dark:bg-gray-950/80 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">
        {/* LEFT — LOGO */}
        <Link
          href="/"
          className="flex md:hidden items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <Lightbulb className="h-8 w-8 text-black dark:text-white" />
          <span className="text-black dark:text-white">MindLume</span>
        </Link>
        <Link
          href="/"
          className="hidden md:flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <Lightbulb
            className="h-8 w-8 transition-all duration-200"
            style={{
              color: bulbColor,
              filter: `drop-shadow(0 0 ${8 * glowOpacity}px rgba(255,255,255,${0.85 * glowOpacity}))`,
            }}
          />
          <span
            className="transition-colors duration-200"
            style={{ color: logoColor }}
          >
            MindLume
          </span>
        </Link>

        {/* CENTER — DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-black hover:text-indigo-900 transition dark:text-gray-100 dark:hover:text-indigo-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* RIGHT — JOIN BUTTON */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsWaitlistOpen(true)}
            className="text-sm px-4 py-2 rounded-full transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: joinBgColor,
              color: joinTextColor,
            }}
          >
            Join
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-black dark:text-white"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden backdrop-blur-xl bg-white/90 border-t border-black/10 px-6 py-6 space-y-5 text-gray-800 dark:bg-gray-950/90 dark:border-white/10 dark:text-gray-200">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-base hover:text-indigo-900 transition dark:hover:text-indigo-300"
            >
              {item.name}
            </a>
          ))}

          <div className="pt-1">
            <ThemeToggle />
          </div>

          <button
            onClick={() => {
              setOpen(false);
              setIsWaitlistOpen(true);
            }}
            className="w-full bg-black text-white py-2 rounded-full mt-4 dark:bg-white dark:text-gray-900"
          >
            Join
          </button>
        </div>
      )}

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </nav>
  );
}

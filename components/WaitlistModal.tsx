"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setRole("");
      setIsSubmitting(false);
      setIsSubmitted(false);
      setIsError(false);
      setFeedback("");
    }
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    setIsError(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role: role.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => ({ error: "Submission failed. Please try again." }));
        const duplicateMessage = "This email is already on the waitlist.";
        const genericMessage = "Submission failed. Please try again.";

        if (response.status === 409) {
          setIsError(true);
          setFeedback(duplicateMessage);
          return;
        }

        setIsError(true);
        setFeedback(data?.error || genericMessage);
        return;
      }

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setRole("");
    } catch {
      setIsError(true);
      setFeedback("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 w-full max-w-md relative border border-transparent dark:border-white/10">
              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-500 dark:text-gray-400"
              >
                ✕
              </button>

              <h2 className="text-2xl font-semibold mb-2">Join the Waitlist</h2>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Be among the first to try MindLume.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-gray-900 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-7 w-7"
                    >
                      <path
                        d="M6 12.5l4 4L18.5 8"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                    You&apos;re on the list
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    Thanks for signing up. We&apos;ll send your early access
                    invite as soon as MindLume is ready.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 w-full rounded-xl bg-black py-3 text-white dark:bg-white dark:text-gray-900"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full border border-gray-300 dark:border-white/15 rounded-lg px-4 py-3 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full border border-gray-300 dark:border-white/15 rounded-lg px-4 py-3 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />

                  <input
                    type="text"
                    placeholder="Role (optional)"
                    className="w-full border border-gray-300 dark:border-white/15 rounded-lg px-4 py-3 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50 dark:bg-white dark:text-gray-900"
                  >
                    {isSubmitting ? "Submitting..." : "Join Waitlist"}
                  </button>

                  {isError && feedback && (
                    <p className="text-sm text-red-600">{feedback}</p>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full border border-gray-300 dark:border-white/15 py-3 rounded-lg text-gray-900 dark:text-gray-100"
                  >
                    Close
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

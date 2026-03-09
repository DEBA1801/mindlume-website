type CtaSectionProps = {
  onOpenWaitlist: () => void;
};

export default function CtaSection({ onOpenWaitlist }: CtaSectionProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-24 px-4 text-center">
      <h2 className="text-3xl font-semibold mb-6">
        Start building your second brain
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
        MindLume remembers what you write, understands how ideas relate, and
        helps you explore them more deeply. Think of it as a space where your
        knowledge expands with you. Join the waitlist and start connecting your
        ideas in a whole new way.
      </p>

      <button
        onClick={onOpenWaitlist}
        className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition"
      >
        Join the Waitlist
      </button>
    </section>
  );
}

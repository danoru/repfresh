"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <Blob className="bg-mint -top-24 -left-24" />
      <Blob className="bg-blush top-32 -right-20" delay={0.15} />
      <Blob className="bg-lavender bottom-0 left-1/3" delay={0.3} />

      <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-28 text-center">
        <motion.p
          className="inline-block px-3 py-1 rounded-pill bg-cream-deep text-ink-soft text-xs tracking-wide uppercase mb-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          No login. No streaks. Just movement.
        </motion.p>

        <motion.h1
          className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          A fresh workout,
          <br />
          <span className="text-mint-deep">at the drop of a hat.</span>
        </motion.h1>

        <motion.p
          className="text-lg text-ink-soft max-w-xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Pick your focus, your equipment, your time. We&apos;ll shuffle together
          something to move you — with form cues for every exercise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Link
            href="/new"
            className="inline-block px-7 py-4 rounded-pill bg-ink text-cream font-medium shadow-lift hover:-translate-y-0.5 transition-transform"
          >
            Generate a workout →
          </Link>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <FeatureCard
            color="bg-mint"
            title="Filter quickly"
            body="Strength, cardio, yoga, pilates. Bodyweight or what you've got."
          />
          <FeatureCard
            color="bg-blush"
            title="See proper form"
            body="Each exercise comes with cues so you can self-coach."
          />
          <FeatureCard
            color="bg-lavender"
            title="Shuffle freely"
            body="Hate today's pick? Re-roll until something clicks."
          />
        </div>
      </div>
    </section>
  );
}

function Blob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute w-72 h-72 rounded-full blur-3xl opacity-40 ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.4 }}
      transition={{ duration: 1.2, delay }}
    />
  );
}

function FeatureCard({
  color,
  title,
  body,
}: {
  color: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white rounded-card p-6 shadow-soft">
      <div className={`w-8 h-8 rounded-full mb-4 ${color}`} />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-ink-soft">{body}</p>
    </div>
  );
}

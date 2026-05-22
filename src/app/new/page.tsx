"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  generateWorkout,
  type WorkoutFilters,
  type WorkoutItem,
} from "../../lib/generateWorkout";
import type {
  BodyPart,
  Equipment,
  WorkoutType,
} from "../../data/exercises";
import { cn } from "../../lib/utils";

const TYPES: WorkoutType[] = ["Strength", "Cardio", "Yoga", "Pilates"];
const FOCUSES: BodyPart[] = ["Upper Body", "Lower Body", "Core", "Full Body"];
const EQUIPMENT: Equipment[] = ["Bodyweight", "Dumbbells", "Resistance Bands"];
const DURATIONS = [15, 30, 45, 60];

const TYPE_COLOR: Record<WorkoutType, string> = {
  Strength: "bg-mint",
  Cardio: "bg-blush",
  Yoga: "bg-lavender",
  Pilates: "bg-sky",
};

export default function NewWorkoutPage() {
  const [filters, setFilters] = useState<WorkoutFilters>({
    type: "Strength",
    focus: "Full Body",
    equipment: ["Bodyweight"],
    durationMin: 30,
  });
  const [workout, setWorkout] = useState<WorkoutItem[] | null>(null);
  const [seed, setSeed] = useState(0);

  const toggleEquipment = (eq: Equipment) => {
    setFilters((f) => {
      const has = f.equipment.includes(eq);
      const next = has
        ? f.equipment.filter((e) => e !== eq)
        : [...f.equipment, eq];
      return { ...f, equipment: next.length ? next : f.equipment };
    });
  };

  const handleGenerate = () => {
    const s = Date.now();
    setSeed(s);
    setWorkout(generateWorkout(filters, s));
  };

  const handleShuffle = () => {
    const s = seed + 1;
    setSeed(s);
    setWorkout(generateWorkout(filters, s));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          Build something fresh
        </h1>
        <p className="text-ink-soft">
          Pick a focus and we&apos;ll put together a session.
        </p>
      </header>

      <div className="bg-white rounded-card shadow-soft p-6 md:p-8 mb-10">
        <FilterRow label="Type">
          {TYPES.map((t) => (
            <Chip
              key={t}
              active={filters.type === t}
              activeClass={TYPE_COLOR[t]}
              onClick={() => setFilters({ ...filters, type: t })}
            >
              {t}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Focus">
          {FOCUSES.map((f) => (
            <Chip
              key={f}
              active={filters.focus === f}
              onClick={() => setFilters({ ...filters, focus: f })}
            >
              {f}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Equipment">
          {EQUIPMENT.map((eq) => (
            <Chip
              key={eq}
              active={filters.equipment.includes(eq)}
              onClick={() => toggleEquipment(eq)}
            >
              {eq}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Duration">
          {DURATIONS.map((d) => (
            <Chip
              key={d}
              active={filters.durationMin === d}
              onClick={() => setFilters({ ...filters, durationMin: d })}
            >
              {d} min
            </Chip>
          ))}
        </FilterRow>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleGenerate}
            className="px-6 py-3 rounded-pill bg-ink text-cream font-medium shadow-soft hover:-translate-y-0.5 transition-transform"
          >
            {workout ? "Regenerate" : "Generate workout"}
          </button>
          {workout && (
            <button
              onClick={handleShuffle}
              className="px-6 py-3 rounded-pill bg-cream-deep text-ink font-medium hover:bg-butter transition-colors"
            >
              ↻ Shuffle order
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {workout && (
          <motion.div
            key={seed}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {workout.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workout.map((item) => (
                  <ExerciseCard key={item.exercise.id} item={item} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-3 border-b border-cream-deep last:border-0">
      <span className="text-xs uppercase tracking-wide text-muted w-24 shrink-0">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  activeClass = "bg-mint",
  onClick,
  children,
}: {
  active: boolean;
  activeClass?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-pill text-sm transition-all",
        active
          ? `${activeClass} text-ink shadow-soft`
          : "bg-cream-deep text-ink-soft hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function ExerciseCard({ item }: { item: WorkoutItem }) {
  const { exercise } = item;
  return (
    <motion.div
      className="bg-white rounded-card shadow-soft overflow-hidden flex flex-col"
      whileHover={{ y: -2 }}
    >
      <div className="aspect-video bg-cream-deep relative">
        {exercise.youtubeId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${exercise.youtubeId}`}
            title={`${exercise.name} form demo`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink-soft text-sm">
            <span className="px-3 py-1 rounded-pill bg-white/70">
              Form video coming soon
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="text-lg font-semibold">
            <span className="text-muted mr-2">{item.order}.</span>
            {exercise.name}
          </h3>
        </div>

        <div className="flex gap-2 text-xs text-ink-soft mb-4">
          <span className="px-2 py-0.5 rounded-pill bg-cream-deep">
            {item.sets} × {item.reps}
          </span>
          <span className="px-2 py-0.5 rounded-pill bg-cream-deep">
            {item.restSec}s rest
          </span>
        </div>

        <ul className="space-y-1.5 text-sm text-ink-soft mt-auto">
          {exercise.formCues.map((cue, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-mint-deep mt-1">•</span>
              <span>{cue}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-card p-12 text-center shadow-soft">
      <div className="w-12 h-12 rounded-full bg-blush mx-auto mb-4" />
      <h3 className="font-semibold mb-2">No exercises match those filters</h3>
      <p className="text-sm text-ink-soft">
        Try adding another piece of equipment or broadening the focus.
      </p>
    </div>
  );
}

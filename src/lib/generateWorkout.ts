import {
  EXERCISES,
  type BodyPart,
  type Equipment,
  type Exercise,
  type WorkoutType,
} from "../data/exercises";

export type WorkoutFilters = {
  type: WorkoutType;
  focus: BodyPart;
  equipment: Equipment[];
  durationMin: number;
};

export type WorkoutItem = {
  exercise: Exercise;
  order: number;
  sets: number;
  reps: string;
  restSec: number;
};

const PRESCRIPTION: Record<
  WorkoutType,
  { sets: number; reps: string; restSec: number }
> = {
  Strength: { sets: 3, reps: "8–12", restSec: 60 },
  Cardio: { sets: 4, reps: "40s on / 20s off", restSec: 30 },
  Yoga: { sets: 1, reps: "5 breaths", restSec: 15 },
  Pilates: { sets: 2, reps: "10–15", restSec: 30 },
};

// Deterministic shuffle so a given seed reproduces the same order.
function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function generateWorkout(
  filters: WorkoutFilters,
  seed: number = Date.now(),
): WorkoutItem[] {
  const pool = EXERCISES.filter((ex) => {
    if (ex.type !== filters.type) return false;
    if (filters.focus !== "Full Body" && ex.bodyPart !== filters.focus) {
      // Full-body & core exercises still welcome under Full Body focus.
      if (filters.focus === "Core" && ex.bodyPart === "Core") return true;
      return false;
    }
    if (filters.equipment.length === 0) return false;
    return ex.equipment.some((eq) => filters.equipment.includes(eq));
  });

  // Roughly one exercise per ~5 minutes, clamped to a sensible range.
  const target = Math.max(4, Math.min(8, Math.round(filters.durationMin / 5)));
  const picked = shuffle(pool, seed).slice(0, target);
  const rx = PRESCRIPTION[filters.type];

  return picked.map((exercise, i) => ({
    exercise,
    order: i + 1,
    sets: rx.sets,
    reps: rx.reps,
    restSec: rx.restSec,
  }));
}

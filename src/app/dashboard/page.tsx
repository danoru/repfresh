"use client";

import { useEffect, useState } from "react";
import moment from "moment";

import Calendar from "../../components/calendar/Calendar";

import StatCard from "@/src/components/cards/StatCard";

type UserStats = {
  workoutsThisMonth: number;
  workoutsThisYear: number;
  totalMinutes: number;
  currentStreak: number;
  records: Record<string, { value: string; date: string }>;
};

const mockStats: UserStats = {
  workoutsThisMonth: 12,
  workoutsThisYear: 98,
  totalMinutes: 1804,
  currentStreak: 6,
  records: {
    Squat: { value: "245 lbs", date: "2025-06-10" },
    Deadlift: { value: "305 lbs", date: "2025-05-28" },
    Pushups: { value: "50 reps", date: "2025-06-25" },
  },
};

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setStats(mockStats);
    }, 300);
  }, []);

  if (!stats) return <div className="p-6">Loading dashboard...</div>;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome back 👋</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Workouts (This Month)"
          value={stats.workoutsThisMonth}
        />
        <StatCard label="Workouts (This Year)" value={stats.workoutsThisYear} />
        <StatCard label="Total Minutes" value={stats.totalMinutes} />
        <StatCard label="Streak" value={`${stats.currentStreak} days`} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Workout Calendar</h2>
        <Calendar
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
          markedDates={["2025-07-02", "2025-07-10", "2025-07-14"]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Personal Records</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.records).map(([exercise, { value, date }]) => (
            <li
              key={exercise}
              className="rounded-lg border p-4 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
            >
              <h3 className="font-medium text-lg mb-1">🏋️ {exercise}</h3>
              <p className="text-sm">PR: {value}</p>
              <p className="text-xs text-muted-foreground">
                Set on {moment(date).format("MMM D, YYYY")}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

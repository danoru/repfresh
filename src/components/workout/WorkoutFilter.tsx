"use client";

import { useForm } from "react-hook-form";

type WorkoutFilterValues = {
  type: string;
  bodyPart: string;
  equipment: string;
};

export function WorkoutFilter({
  onFilter,
}: {
  onFilter: (data: WorkoutFilterValues) => void;
}) {
  const { register, handleSubmit } = useForm<WorkoutFilterValues>();

  return (
    <form onSubmit={handleSubmit(onFilter)} className="space-y-4">
      <select {...register("type")}><option>Strength</option></select>
      <select {...register("bodyPart")}><option>Upper Body</option></select>
      <select {...register("equipment")}><option>Bodyweight</option></select>
      <button type="submit">Generate</button>
    </form>
  );
}

import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <motion.div
      className={cn(
        "rounded-lg p-4 bg-primary text-black shadow-md hover:shadow-lg transition flex flex-col gap-2"
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-sm font-medium opacity-80">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </motion.div>
  );
}

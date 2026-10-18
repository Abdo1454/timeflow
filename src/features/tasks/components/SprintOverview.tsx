
import { Zap } from "lucide-react";

type Props = {
  totalTasks: number;
  completedTasks: number;
};

export default function SprintOverview({
  totalTasks,
  completedTasks,
}: Props) {
  const progress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <section className="flex flex-col justify-between gap-5 rounded-2xl bg-indigo-600 p-6 text-white sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2 text-sm text-indigo-100">
          <Zap size={16} />
          Active Sprints
        </div>

        <h2 className="mt-3 text-2xl font-bold">Sprint 43</h2>

        <p className="mt-1 text-sm text-indigo-100">
          {totalTasks} Tasks · On track for Friday
        </p>
      </div>

      <div className="sm:text-right">
        <p className="text-sm text-indigo-100">Sprint progress</p>
        <p className="mt-1 text-3xl font-bold">{progress}%</p>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-indigo-400 sm:w-48">
          <div
            className="h-full rounded-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}

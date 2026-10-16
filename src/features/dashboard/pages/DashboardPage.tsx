
import {
  ListTodo,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

import StatsCard from "../components/StatsCard";

const stats = [
  {
    title: "Total Tasks",
    value: 24,
    description: "Tasks created this week",
    icon: ListTodo,
    iconClassName: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Completed",
    value: 16,
    description: "Tasks completed this week",
    icon: CheckCircle2,
    iconClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "In Progress",
    value: 5,
    description: "Tasks currently active",
    icon: Clock,
    iconClassName: "bg-amber-50 text-amber-600",
  },
  {
    title: "Productivity",
    value: "85%",
    description: "Great progress this week",
    icon: TrendingUp,
    iconClassName: "bg-purple-50 text-purple-600",
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Track your productivity at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
}

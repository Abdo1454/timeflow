
import {
  ListTodo,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

import StatsCard from "../components/StatsCard";
import ProductivityChart from "../components/ProductivityChart";
import TodayTask from "../components/TodayTasks";
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
 
<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
  <div className="xl:col-span-2">
    <TodayTask />
  </div>

  <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <h2 className="text-lg font-bold text-gray-900">
      Quick Overview
    </h2>

    <p className="mt-2 text-sm text-gray-500">
      Stay focused, complete your tasks, and build consistent habits.
    </p>

    <div className="mt-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Tasks completed
        </span>
        <span className="text-sm font-semibold text-gray-900">
          16 / 24
        </span>
      </div>

      <div className="h-2 rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full bg-indigo-600"
          style={{ width: "66.67%" }}
        />
      </div>

      <p className="text-xs text-gray-500">
        Keep going! You're making progress.
      </p>
    </div>
  </aside>
</div>

<ProductivityChart />



    </section>
  );
}

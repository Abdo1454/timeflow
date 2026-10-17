
import type { Dispatch, SetStateAction } from "react";
import {
  ListTodo,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

import StatsCard from "../components/StatsCard";
import ProductivityChart from "../components/ProductivityChart";
import TodayTask from "../components/TodayTasks";
import type { Task } from "../data/data";

type DashboardPageProps = {
  tasks: Task[];
  allTasks?: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  onDeleteTask: (id: number) => void;
  onAddTaskClick: () => void;
};

export default function DashboardPage({
  tasks,
  allTasks = tasks,
  setTasks,
  onDeleteTask,
  onAddTaskClick,
}: DashboardPageProps) {
  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  const completedCount = allTasks.filter(
    (task) => task.completed
  ).length;

  const productivity = allTasks.length
    ? Math.round((completedCount / allTasks.length) * 100)
    : 0;

  const stats = [
    {
      title: "Total Tasks",
      value: allTasks.length,
      description: "Tasks created",
      icon: ListTodo,
      iconClassName: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Completed",
      value: completedCount,
      description: "Tasks completed",
      icon: CheckCircle2,
      iconClassName: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "In Progress",
      value: allTasks.length - completedCount,
      description: "Tasks not completed",
      icon: Clock,
      iconClassName: "bg-amber-50 text-amber-600",
    },
    {
      title: "Productivity",
      value: `${productivity}%`,
      description: "Tasks completed",
      icon: TrendingUp,
      iconClassName: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Track your productivity at a glance.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Tasks and quick overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TodayTask
            tasks={tasks}
            onToggleTask={toggleTask}
            onAddTaskClick={onAddTaskClick}
            onDeleteTask={onDeleteTask}
          />
        </div>

        {/* Quick Overview */}
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
                {completedCount} / {allTasks.length}
              </span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-gray-100"
              role="progressbar"
              aria-label="Task completion progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={productivity}
            >
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${productivity}%` }}
              />
            </div>

            <p className="text-sm font-medium text-indigo-600">
              {productivity}% completed
            </p>
          </div>
        </aside>
      </div>

      {/* Productivity chart */}
      <ProductivityChart />
    </section>
  );
}

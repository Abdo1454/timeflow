
import { useState, type ComponentType } from "react";
import {
  ListTodo,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

import StatsCard from "../components/StatsCard";
import ProductivityChart from "../components/ProductivityChart";
import TodayTask from "../components/TodayTasks";
import AddTaskModal, { type NewTask } from "../components/AddTaskModal";
import { initialTasks, type Task } from "../data/data";

type TodayTaskProps = {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onAddTaskClick: () => void;
};

const TodayTaskWithProps = TodayTask as unknown as ComponentType<TodayTaskProps>;

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleAddTask(newTask: NewTask) {
    const formattedTime = new Date(
      `2000-01-01T${newTask.time}:00`
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTask.title,
        time: formattedTime,
        priority: newTask.priority,
        completed: false,
      },
    ]);

    setIsModalOpen(false);
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
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
      value: tasks.length - completedCount,
      description: "Tasks not completed",
      icon: Clock,
      iconClassName: "bg-amber-50 text-amber-600",
    },
    {
      title: "Productivity",
      value: tasks.length
        ? `${Math.round((completedCount / tasks.length) * 100)}%`
        : "0%",
      description: "Tasks completed",
      icon: TrendingUp,
      iconClassName: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <>
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Overview</h2>
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
            <TodayTaskWithProps
              tasks={tasks}
              onToggleTask={toggleTask}
              onAddTaskClick={() => setIsModalOpen(true)}
            />
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
                <span className="text-sm text-gray-600">Tasks completed</span>
                <span className="text-sm font-semibold text-gray-900">
                  {completedCount} / {tasks.length}
                </span>
              </div>

              <div className="h-2 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-indigo-600 transition-all"
                  style={{
                    width: `${
                      tasks.length ? (completedCount / tasks.length) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </aside>
        </div>

        <ProductivityChart />
      </section>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </>
  );
}


import { useState } from "react";

import Sidebar from "../../../layouts/Sidebar";
import Header from "../../../layouts/Header";

import TasksHeader from "../components/TasksHeader";
import SprintOverview from "../components/SprintOverview";
import TaskStats from "../components/TaskStats";
import TasksList, {
  type Task,
} from "../components/TasksList";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Build the My Tasks page",
    project: "TimeFlow",
    status: "In Progress",
    priority: "High",
    dueDate: "Today",
  },
  {
    id: 2,
    title: "Review TypeScript concepts",
    project: "Learning",
    status: "In Progress",
    priority: "High",
    dueDate: "Today",
  },
  {
    id: 3,
    title: "Complete dashboard analytics",
    project: "TimeFlow",
    status: "Todo",
    priority: "Medium",
    dueDate: "Tomorrow",
  },
  {
    id: 4,
    title: "Practice ICPC problems",
    project: "Learning",
    status: "Done",
    priority: "High",
    dueDate: "Today",
  },
  {
    id: 5,
    title: "Review weekly goals",
    project: "Personal",
    status: "Done",
    priority: "Low",
    dueDate: "Today",
  },
];

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"List" | "Board">("List");

  function addTask() {
    const title = window.prompt("Enter your new task:");

    if (!title?.trim()) return;

    setTasks((current) => [
      {
        id: Date.now(),
        title: title.trim(),
        project: "Personal",
        status: "Todo",
        priority: "Medium",
        dueDate: "Today",
      },
      ...current,
    ]);
  }

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) return task;

        return {
          ...task,
          status: task.status === "Done" ? "Todo" : "Done",
        };
      }),
    );
  }

  function deleteTask(id: number) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const openTasks = tasks.length - completedTasks;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fc]">
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:block">
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="shrink-0 border-b border-gray-100 bg-white">
          <Header
            onAddTaskClick={addTask}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl space-y-7 p-5 sm:p-8">
            <TasksHeader
              view={view}
              onViewChange={setView}
              onAddTask={addTask}
            />

            <SprintOverview
              totalTasks={tasks.length}
              completedTasks={completedTasks}
            />

            <TaskStats
              completedTasks={completedTasks}
              openTasks={openTasks}
            />

            <TasksList
              tasks={tasks.filter((task) => {
                const query = searchQuery.trim().toLowerCase();
                return (
                  task.title.toLowerCase().includes(query) ||
                  task.project.toLowerCase().includes(query)
                );
              })}
              view={view}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

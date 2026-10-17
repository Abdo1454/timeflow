
import { useState } from "react";
import {
  Check,
  Clock3,
  Plus,
  Search,
  ListFilter,
  Trash2,
} from "lucide-react";

import Button from "../../../components/ui/Button";
import { priorityStyles, type Task } from "../data/data";

type TodayTaskProps = {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onAddTaskClick: () => void;
};

export default function TodayTask({
  tasks,
  onToggleTask,
  onDeleteTask,
  onAddTaskClick,
}: TodayTaskProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "In Progress" && !task.completed);

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Today's Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>

        <Button
          type="button"
          leftIcon={<Plus size={16} />}
          onClick={onAddTaskClick}
        >
          Add Task
        </Button>
      </div>

      {/* Search */}
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-indigo-400">
        <Search
          size={17}
          className="shrink-0 text-gray-400"
        />

        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Filters */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
          <ListFilter
            size={16}
            className="shrink-0 text-gray-400"
          />

          <span className="text-sm text-gray-500">Status</span>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none"
          >
            <option value="All">All tasks</option>
            <option value="In Progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
          <ListFilter
            size={16}
            className="shrink-0 text-gray-400"
          />

          <span className="text-sm text-gray-500">Priority</span>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none"
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
      </div>

      {/* Progress */}
      <div
        className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-label="Task completion progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Task list */}
      <div className="mt-4 divide-y divide-gray-100">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 py-4"
            >
              <Button
                type="button"
                variant={task.completed ? "primary" : "outline"}
                size="sm"
                onClick={() => onToggleTask(task.id)}
                aria-label={
                  task.completed
                    ? `Mark ${task.title} incomplete`
                    : `Complete ${task.title}`
                }
                aria-pressed={task.completed}
                className="size-5 shrink-0 rounded-md !p-0"
              >
                {task.completed && <Check size={14} />}
              </Button>

              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                  <Clock3 size={13} />
                  {task.time}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
              >
                {task.priority}
              </span>

              <button
                type="button"
                onClick={() => onDeleteTask(task.id)}
                aria-label={`Delete ${task.title}`}
                title="Delete task"
                className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="py-10 text-center">
            <Search
              className="mx-auto text-gray-300"
              size={28}
            />

            <p className="mt-3 text-sm font-medium text-gray-700">
              No tasks found
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>
    </section>
  );
}

import { useMemo, useState } from "react";
import { Check, Clock3, Search, Trash2 } from "lucide-react";

export type TaskStatus = "In Progress" | "Todo" | "Done";
export type Priority = "High" | "Medium" | "Low";

export type Task = {
  id: number;
  title: string;
  project: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
};

type Props = {
  tasks: Task[];
  view: "List" | "Board";
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
};

const statuses: TaskStatus[] = ["In Progress", "Todo", "Done"];
const priorityStyles: Record<Priority, string> = {
  High: "bg-rose-50 text-rose-600",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-gray-100 text-gray-500",
};
const statusStyles: Record<TaskStatus, string> = {
  "In Progress": "bg-blue-50 text-blue-700",
  Todo: "bg-gray-100 text-gray-600",
  Done: "bg-emerald-50 text-emerald-700",
};

export default function TasksList({tasks, view, onToggleTask,onDeleteTask}:Props) {

     const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | TaskStatus>("All");

  const filteredTasks = useMemo(
    ()=>
        tasks.filter((task)=>{
            const matchesSearch =
            task.title.toLocaleLowerCase().includes(search.trim().toLowerCase())||
            task.project.toLowerCase().includes(search.trim().toLowerCase());
             return matchesSearch && (filter === "All" || task.status === filter);
        }),
        [tasks, search, filter],
    
  )
  return <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900">Task Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          Track your work and update task status.
        </p>
      </div>
      <div>
        <div>
            <Search size={16} className="text-gray-400" />
             <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
               {(["All", ...statuses] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-lg px-3 py-2 text-sm ${
                filter === status
                  ? "bg-indigo-50 font-semibold text-indigo-700"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
        {view === "List" ? (
        <div className="divide-y divide-gray-100">
          {filteredTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 px-5 py-4">
              <button
                onClick={() => onToggleTask(task.id)}
                aria-label={`Toggle ${task.title}`}
                className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${
                  task.status === "Done"
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-gray-300 text-transparent"
                }`}
              >
                <Check size={13} />
              </button>

              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium ${
                    task.status === "Done"
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                  {task.project} · <Clock3 size={12} /> {task.dueDate}
                </p>
              </div>

              <span className={`hidden rounded-full px-2.5 py-1 text-xs sm:inline-flex ${priorityStyles[task.priority]}`}>
                {task.priority}
              </span>

              <span className={`hidden rounded-full px-2.5 py-1 text-xs md:inline-flex ${statusStyles[task.status]}`}>
                {task.status}
              </span>

              <button
                onClick={() => onDeleteTask(task.id)}
                aria-label={`Delete ${task.title}`}
                className="rounded-lg p-2 text-gray-400 hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-3">
          {statuses.map((status) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === status,
            );

            return (
              <div key={status} className="rounded-xl bg-gray-50 p-3">
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  {status} ({columnTasks.length})
                </h3>

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <article key={task.id} className="rounded-xl border border-gray-200 bg-white p-3">
                      <p className="text-sm font-medium text-gray-800">{task.title}</p>
                      <p className="mt-2 text-xs text-gray-400">{task.project}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`rounded-full px-2 py-1 text-xs ${priorityStyles[task.priority]}`}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => onToggleTask(task.id)}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          {status === "Done" ? "Reopen" : "Complete"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredTasks.length === 0 && (
        <p className="p-10 text-center text-sm text-gray-500">
          No tasks found. Try another search or filter.
        </p>
      )}

      <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </div>
  </section>;
}

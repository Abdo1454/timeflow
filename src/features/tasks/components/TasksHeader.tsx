
import { Columns3, List, Plus } from "lucide-react";

type TasksHeaderProps = {
  view: "List" | "Board";
  onViewChange: (view: "List" | "Board") => void;
  onAddTask: () => void;
};

export default function TasksHeader({
  view,
  onViewChange,
  onAddTask,
}: TasksHeaderProps) {
  return (
    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Workspace</span>
          <span>/</span>
          <span className="font-medium text-indigo-600">
            My Tasks
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
          My Tasks
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage, organize, and prioritize your active backlog and sprints.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* View Switcher */}
        <div className="flex rounded-xl border border-gray-200 bg-white p-1">
          <button
            type="button"
            onClick={() => onViewChange("List")}
            aria-pressed={view === "List"}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              view === "List"
                ? "bg-gray-100 font-semibold text-gray-900"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <List size={16} />
            List
          </button>

          <button
            type="button"
            onClick={() => onViewChange("Board")}
            aria-pressed={view === "Board"}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              view === "Board"
                ? "bg-gray-100 font-semibold text-gray-900"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Columns3 size={16} />
            Board
          </button>
        </div>

        {/* Add Task */}
        <button
          type="button"
          onClick={onAddTask}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus size={17} />
          Add Task
        </button>
      </div>
    </section>
  );
}

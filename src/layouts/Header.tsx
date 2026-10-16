
import { Search, Bell, Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's your productivity overview.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 sm:flex">
          <Search size={18} className="text-gray-400" />
          <input
            type="search"
            placeholder="Search tasks..."
            className="w-36 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Add Task */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Task</span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
        </button>

        {/* User Avatar */}
        <div
          className="flex size-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700"
          title="User profile"
        >
          AE
        </div>
      </div>
    </header>
  );
}

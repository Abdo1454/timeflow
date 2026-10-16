
import { useState } from "react";
import { X } from "lucide-react";
import Button from "../../../components/ui/Button";

export type NewTask = {
  title: string;
  time: string;
  priority: "High" | "Medium" | "Low";
};

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: NewTask) => void;
};

export default function AddTaskModal({
  isOpen,
  onClose,
  onAddTask,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("09:00");
  const [priority, setPriority] =
    useState<NewTask["priority"]>("Medium");

  if (!isOpen) return null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTask({ title: trimmedTitle, time, priority });

    setTitle("");
    setTime("09:00");
    setPriority("Medium");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2
              id="add-task-title"
              className="text-xl font-bold text-gray-900"
            >
              Add New Task
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Add a task to your daily plan.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Task title
            </label>
            <input
              id="task-title"
              autoFocus
              required
              maxLength={100}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Finish dashboard UI"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="task-time"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              id="task-time"
              type="time"
              required
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="task-priority"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="task-priority"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as NewTask["priority"])
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </section>
    </div>
  );
}

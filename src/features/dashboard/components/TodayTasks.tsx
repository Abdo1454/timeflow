import { useState } from "react";
import { Check, Clock3, Plus } from "lucide-react";
import Button from "../../../components/ui/Button";
import AddTaskModal, {
  type NewTask,
} from "./AddTaskModal";
type Task = {
  id: number;
  title: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Finish dashboard UI",
    time: "09:00 AM",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Practice TypeScript",
    time: "11:00 AM",
    priority: "Medium",
    completed: true,
  },
  {
    id: 3,
    title: "Review React concepts",
    time: "02:00 PM",
    priority: "Low",
    completed: false,
  },
  {
    id: 4,
    title: "Solve ICPC problems",
    time: "05:00 PM",
    priority: "High",
    completed: false,
  },
];
const priorityStyles = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700",
};

export default function TodayTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }
function handleAddTask(newTask: NewTask) {
  const formattedTime = new Date(
    `2000-01-01T${newTask.time}:00`,
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  setTasks((currentTasks) => [
    ...currentTasks,
    {
      id: Date.now(),
      title: newTask.title,
      time: formattedTime,
      priority: newTask.priority,
      completed: false,
    },
  ]);
}
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Today's Tasks</h2>

          <p className="mt-1 text-sm text-gray-500">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>

       <Button
  type="button"
  leftIcon={<Plus size={16} />}
  onClick={() => setIsModalOpen(true)}
>
  Add Task
</Button>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{
            width: `${
              tasks.length ? (completedCount / tasks.length) * 100 : 0
            }%`,
          }}
        />
      </div>

      <div className="mt-5 divide-y divide-gray-100">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 py-4">
            <Button
              type="button"
              variant={task.completed ? "primary" : "outline"}
              size="sm"
              onClick={() => toggleTask(task.id)}
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
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                priorityStyles[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
      <AddTaskModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onAddTask={handleAddTask}
/>
    </section>
  );
}

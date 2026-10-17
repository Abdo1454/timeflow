
import { useState, type ComponentType, type Dispatch, type SetStateAction } from "react";
import Header from "./Header";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import AddTaskModal, {
  type NewTask,
} from "../features/dashboard/components/AddTaskModal";
import type { Task } from "../features/dashboard/data/data";
import { initialTasks } from "../features/dashboard/data/data";

type DashboardPageProps = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  onAddTaskClick: () => void;
};

const DashboardPageWithTasks =
  DashboardPage as unknown as ComponentType<DashboardPageProps>;

export default function DashboardLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");

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

    setIsModalOpen(false);
  }
  const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <header className="z-50 shrink-0">
        <Header
          onAddTaskClick={() => setIsModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto p-6">
      <DashboardPageWithTasks
  tasks={filteredTasks}
  setTasks={setTasks}
  onAddTaskClick={() => setIsModalOpen(true)}
/>
      </main>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

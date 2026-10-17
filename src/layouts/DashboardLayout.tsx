
import { useMemo, useState } from "react";

import useTasks from "../features/dashboard/hooks/useTasks";
import Header from "./Header";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import AddTaskModal, {
  type NewTask,
} from "../features/dashboard/components/AddTaskModal";

export default function DashboardLayout() {
  const { tasks, setTasks, deleteTask } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return tasks;

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(query)
    );
  }, [tasks, searchQuery]);

  function handleAddTask(newTask: NewTask) {
    const formattedTime = new Date(
      `2000-01-01T${newTask.time}:00`
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
        <DashboardPage
          tasks={filteredTasks}
          setTasks={setTasks}
          onDeleteTask={deleteTask}
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

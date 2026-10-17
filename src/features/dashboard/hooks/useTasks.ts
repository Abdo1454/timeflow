
import { useEffect, useState } from "react";
import { initialTasks, type Task } from "../data/data";

const STORAGE_KEY = "timeFlow-tasks";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);

      if (savedTasks) {
        const parsedTasks: unknown = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          return parsedTasks as Task[];
        }
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }

    return initialTasks;
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  function deleteTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  return {
    tasks,
    setTasks,
    deleteTask,
  };
}

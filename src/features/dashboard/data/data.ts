
export type Task = {
  id: number;
  title: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

export const initialTasks: Task[] = [
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

export const priorityStyles = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700",
} satisfies Record<Task["priority"], string>;

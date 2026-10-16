import {
  House,
  ListTodo,
  CalendarDays,
  Timer,
  Heart,
  ChartNoAxesColumn,
  Sparkles,
  Settings,
  CircleHelp,
  Clock,
  Plus
} from "lucide-react";

const side = [
  { label: "Dashboard", icon: House },
  { label: "My Tasks", icon: ListTodo },
  { label: "Weekly Planner", icon: CalendarDays },
  { label: "Focus Timer", icon: Timer },
  { label: "Habits", icon: Heart },
  { label: "Analytics", icon: ChartNoAxesColumn },
  { label: "AI Planner", icon: Sparkles, badge: "NEW" },
  { label: "Settings", icon: Settings },
  { label: "Help", icon: CircleHelp },
];
export default function Sidebar() {
  return (
    <div className="m-5 w-50 ">
      <div className="flex flex-row items-center gap-3">
        <div className="rounded-xl bg-indigo-600 p-3 text-white">
          <Clock size={24} strokeWidth={2} />
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            TimeFlow
          </h2>
          <p className="text-xs text-gray-500">Smart Time Management</p>
        </div>
      </div>
      <div className="flex  gap-5 my-5 bg-[var(--background-side)] text-[var(--primary)] p-2 rounded-xl">
        <Plus size={20} />
        <h3 className="text-[var(--primary)]">Quick Capture</h3>
        <p>C</p>
      </div>
      <div className="flex flex-col gap-5 my-5 ">
        {side.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex gap-2">
              <Icon size={20} />
              <h3>{item.label}</h3>
              {item.badge && (
                <span className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


import {
  Activity,
  CalendarDays,
  Check,
  Target,
} from "lucide-react";

type Props = {
  completedTasks: number;
  openTasks: number;
};

export default function TaskStats({
  completedTasks,
  openTasks,
}: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={<Target size={19} />}
        label="Today's Focus"
        value="3h 30m"
        detail="2 in-progress blocks"
        iconStyle="bg-violet-50 text-violet-600"
      />

      <StatCard
        icon={<Check size={19} />}
        label="Completed Today"
        value={String(completedTasks)}
        detail="Tasks marked as done"
        iconStyle="bg-emerald-50 text-emerald-600"
      />

      <StatCard
        icon={<Activity size={19} />}
        label="Velocity Ratio"
        value="88%"
        detail="High energy window"
        iconStyle="bg-blue-50 text-blue-600"
      />

      <StatCard
        icon={<CalendarDays size={19} />}
        label="Open Tasks"
        value={String(openTasks)}
        detail="Across your backlog"
        iconStyle="bg-amber-50 text-amber-600"
      />
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
  iconStyle,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  iconStyle: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-3 text-2xl font-bold text-gray-900">
            {value}
          </p>
        </div>

        <div className={`rounded-xl p-2.5 ${iconStyle}`}>
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-400">{detail}</p>
    </div>
  );
}

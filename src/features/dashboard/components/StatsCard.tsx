
import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
};

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "bg-indigo-50 text-indigo-600",
}: StatsCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClassName}`}>
          <Icon size={22} aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

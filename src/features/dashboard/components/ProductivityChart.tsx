
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Button from "../../../components/ui/Button";

const weeklyData = [
  { day: "Mon", completed: 4 },
  { day: "Tue", completed: 6 },
  { day: "Wed", completed: 3 },
  { day: "Thu", completed: 8 },
  { day: "Fri", completed: 5 },
  { day: "Sat", completed: 9 },
  { day: "Sun", completed: 7 },
];

type Period = "Week" | "Month";

export default function ProductivityChart() {
  const [period, setPeriod] = useState<Period>("Week");

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Productivity Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Tasks completed over time
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={period === "Week" ? "primary" : "outline"}
            onClick={() => setPeriod("Week")}
          >
            Week
          </Button>

          <Button
            size="sm"
            variant={period === "Month" ? "primary" : "outline"}
            onClick={() => setPeriod("Month")}
          >
            Month
          </Button>
        </div>
      </div>

      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={weeklyData}
            margin={{ top: 8, right: 12, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontSize: 12,
              }}
              formatter={(value) => [value, "Completed tasks"]}
            />

            <Line
              type="monotone"
              dataKey="completed"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#4F46E5",
                strokeWidth: 2,
                stroke: "#FFFFFF",
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        {period === "Week"
          ? "Weekly view · Sample data"
          : "Monthly view will be available when monthly data is connected."}
      </p>
    </section>
  );
}

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    date: string;
    checkIn: number;
    late: number;
  }[];
}
export default function AttendanceLineChart({ data }: Props) {
  return (
    <div className="w-full h-64 p-4 rounded-xl border bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Monthly Attendance Trend</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />

          {/* Total employees checked in */}
          <Line
            type="monotone"
            dataKey="checkIn"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />

          {/* Total employees late */}
          <Line
            type="monotone"
            dataKey="late"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

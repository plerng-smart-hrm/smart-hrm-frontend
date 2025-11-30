"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

interface Props {
  data: {
    date: string;
    checkIn: number;
    late: number;
  }[];
}
export default function AttendanceBarChart({ data }: Props) {
  return (
    <div className="w-full h-64 p-4 rounded-xl border bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />

          {/* Check-in bar */}
          <Bar dataKey="checkIn" fill="#3b82f6" radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="checkIn"
              position="top"
              style={{ fill: "#1e40af", fontSize: 12, fontWeight: 600 }}
            />
          </Bar>

          {/* Late bar */}
          <Bar dataKey="late" fill="#ef4444" radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="late"
              position="top"
              style={{ fill: "#991b1b", fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

export function DeviceBarChart({ data }: Props) {
  return (
    <div className="w-full h-60 rounded-lg border px-4 py-6 shadow bg-white dark:bg-neutral-900">
      <h3 className="text-sm font-semibold mb-3">Employees Per Device</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          barCategoryGap="20%" // makes bars spaced nicely
        >
          <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />

          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="value"
              position="top"
              fill="#000"
              fontSize={8}
              offset={6}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

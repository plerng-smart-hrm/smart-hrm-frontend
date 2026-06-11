import { Pie, PieChart, Cell } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const LEAVE_BALANCE_COLORS = {
  used: "#3b82f6",
  remaining: "#e5e7eb",
} as const;

const leaveBalanceConfig: ChartConfig = {
  used: { label: "Used", color: LEAVE_BALANCE_COLORS.used },
  remaining: { label: "Remaining", color: LEAVE_BALANCE_COLORS.remaining },
};

export interface Props {
  label: string;
  used: number;
  total: number;
}

export function LeaveBalancePieChart({ label, used, total }: Props) {
  const usedValue = Number(used);

  const totalValue = Number(total);

  const remainingValue = Math.max(totalValue - usedValue, 0);

  const chartData = [
    {
      name: "used",
      value: usedValue,
      fill: "#3b82f6",
    },

    {
      name: "remaining",
      value: remainingValue,
      fill: "#e5e7eb",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <ChartContainer config={leaveBalanceConfig} className="h-full w-full">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={32}
              outerRadius={42}
              strokeWidth={0}
            >
              {chartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-semibold leading-none">{used}</span>
          <span className="text-[10px] text-muted-foreground leading-none mt-1">/{total}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground text-center">{label}</span>
    </div>
  );
}

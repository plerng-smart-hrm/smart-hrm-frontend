"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ILeaveRequest } from "@/types/admin/leave-request";
import { LeaveBalancePieChart } from "@/components/charts/LeaveBalanceChart";
import StatCard from "@/components/charts/StatCard";
import { BellDot } from "lucide-react";
import { ILeaveBalance } from "@/types/admin/leave-balance";

interface Props {
  leaveRequests: ILeaveRequest[];
  leaveBalance?: ILeaveBalance;
}

export default function LeaveBalanceCard({ leaveRequests, leaveBalance }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Balance {leaveBalance?.year}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <StatCard
            title="Total Leave Requested"
            value={leaveRequests.length ?? 0}
            icon={BellDot}
            className="bg-[#BE962D]"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <LeaveBalancePieChart
            label="Annual Leave"
            used={leaveBalance?.annualUsedDays ?? 0}
            total={leaveBalance?.annualEntitledDays ?? 0}
          />
          <LeaveBalancePieChart
            label="Special Leave"
            used={leaveBalance?.specialUsedDays ?? 0}
            total={leaveBalance?.specialEntitledDays ?? 0}
          />
        </div>
      </CardContent>
    </Card>
  );
}

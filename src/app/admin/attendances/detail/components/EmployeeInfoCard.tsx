"use client";

import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Calendar, Hash } from "lucide-react";
import { format, parseISO } from "date-fns";
import { IEmployeeAttendanceSummary } from "@/types/admin/attendance-summary";

interface EmployeeInfoCardProps {
  employee: IEmployeeAttendanceSummary | null;
}

export default function EmployeeInfoCard({ employee }: EmployeeInfoCardProps) {
  if (!employee) {
    return (
      <div className="h-full">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4" />
          Employee Info
        </h3>
        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
          No employee selected
        </div>
      </div>
    );
  }

  const fullNameEn = `${employee.firstName} ${employee.lastName}`;
  const fullNameKh =
    employee.firstNameKh && employee.lastNameKh
      ? `${employee.firstNameKh} ${employee.lastNameKh}`
      : null;

  const formattedJoinDate = employee.joinDate
    ? format(parseISO(employee.joinDate), "dd MMM yyyy")
    : "-";

  return (
    <div className="h-full">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
        <User className="h-4 w-4" />
        Employee Info
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-lg">
              {employee.firstName.charAt(0)}
              {employee.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold">{fullNameEn}</p>
            {fullNameKh && (
              <p className="text-sm text-muted-foreground">{fullNameKh}</p>
            )}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <InfoRow
            icon={<Hash className="h-4 w-4" />}
            label="Employee Code"
            value={employee.empCode}
          />
          <InfoRow
            icon={<User className="h-4 w-4" />}
            label="Gender"
            value={
              <Badge variant="outline" className="font-normal">
                {employee.gender}
              </Badge>
            }
          />
          <InfoRow
            icon={<Briefcase className="h-4 w-4" />}
            label="Position"
            value={employee.position}
          />
          <InfoRow
            icon={<Calendar className="h-4 w-4" />}
            label="Join Date"
            value={formattedJoinDate}
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

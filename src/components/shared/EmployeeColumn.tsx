"use client";

import { Mars, Venus } from "lucide-react";
import { IEmployee } from "@/types/admin/employee";

interface EmployeeColumnProps {
  employee?: IEmployee;
}

export const EmployeeColumn = ({ employee }: EmployeeColumnProps) => {
  const fullName = [employee?.lastName, employee?.firstName].filter(Boolean).join(" ");
  const khName = [employee?.lastNameKh, employee?.firstNameKh].filter(Boolean).join(" ");

  const gender = employee?.gender?.toUpperCase();

  return (
    <div className="flex items-center gap-3 min-w-[220px]">
      {/* Avatar */}
      <div className="h-9 w-9 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm  uppercase">
        {employee?.profileUrl ? (
          <img src={employee.profileUrl} alt={fullName || "Employee"} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          employee?.firstName?.charAt(0) || "?"
        )}
      </div>

      <div className="flex flex-col gap-0.5 leading-tight">
        <div className="flex items-center gap-1">
          <span className="text-sm">{fullName || "-"}</span>

          {gender === "MALE" && <Mars className="h-3.5 w-3.5 text-blue-500" />}

          {gender === "FEMALE" && <Venus className="h-3.5 w-3.5 text-pink-500" />}
        </div>

        {khName && <span className="text-xs text-muted-foreground">{khName}</span>}

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">{employee?.empCode || "-"}</span>

          <span className="text-xs font-medium text-muted-foreground">{employee?.position || "No position"}</span>
        </div>
      </div>
    </div>
  );
};

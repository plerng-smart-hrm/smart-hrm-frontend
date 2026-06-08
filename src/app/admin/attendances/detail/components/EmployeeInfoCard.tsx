"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { RenderView } from "@/components/shared/view/RenderView";
import { IEmployee } from "@/types/admin/employee";
import { formatToDate } from "@/utils/custom-format";

interface EmployeeInfoCardProps {
  employee?: IEmployee | null;
}

export default function EmployeeInfoCard({ employee }: EmployeeInfoCardProps) {
  if (!employee) {
    return (
      <div className="h-full">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4" />
          Employee Info
        </h3>
        <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">No employee selected</div>
      </div>
    );
  }

  const fullNameEn = `${employee.firstName} ${employee.lastName}`;
  const fullNameKh =
    employee.firstNameKh && employee.lastNameKh ? `${employee.firstNameKh} ${employee.lastNameKh}` : null;

  return (
    <div className="h-full">
      <h3 className="text-sm  mb-3 flex items-center gap-2 ">Employee Info</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-lg">
              {employee.firstName?.charAt(0)}
              {employee.lastName?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold">{fullNameEn}</p>
            {fullNameKh && <p className="text-sm text-muted-foreground">{fullNameKh}</p>}
          </div>
        </div>

        <RenderView
          className="lg:grid-cols-1"
          fields={[
            {
              label: "Employee Code",
              value: employee.empCode,
            },
            {
              label: "Gender",
              value: (
                <Badge variant="outline" className="font-normal">
                  {employee.gender}
                </Badge>
              ),
            },

            { label: "Join Date", value: formatToDate(employee.startDate) },
            {
              label: "Position",
              value: employee.position,
            },
            {
              label: "Department",
              value: "",
            },
          ]}
        />
      </div>
    </div>
  );
}

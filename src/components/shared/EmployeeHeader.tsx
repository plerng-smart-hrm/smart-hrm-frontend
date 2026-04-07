import { User } from "lucide-react";
import { IEmployee } from "@/types/admin/employee";
import { formatToDate } from "@/utils/shared-format";
import { RenderView } from "@/components/shared/view/RenderView";

interface Props {
  employee?: IEmployee | null;
}

export default function EmployeeHeader({ employee }: Props) {
  if (!employee) return null;

  const fullname = [employee.lastName, employee.firstName].filter(Boolean).join(" ");
  const fullnameKh = [employee.lastNameKh, employee.firstNameKh].filter(Boolean).join(" ");
  const department = (employee as any).department?.name ?? (employee as any).departmentName;

  return (
    <div className="flex gap-4 rounded-md border bg-muted/30 p-4">
      {/* Photo */}
      <div className="h-28 w-28 shrink-0 rounded-md border bg-background flex items-center justify-center overflow-hidden shadow-sm">
        {employee.profileUrl ? (
          <img src={employee.profileUrl} alt="Profile" className="h-full w-full object-cover" />
        ) : (
          <User className="h-10 w-10 text-muted-foreground" />
        )}
      </div>

      {/* Info grid via RenderView */}
      <div className="flex-1">
        <RenderView
          className="grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-3"
          fields={[
            { label: "Employee Code", value: employee.empCode },
            { label: "Full Name", value: fullname },
            { label: "Full Name (KH)", value: fullnameKh },
            { label: "Gender", value: employee.gender },

            { label: "Phone Number", value: employee.phone },
            { label: "Start Date", value: formatToDate(employee.startDate) },
            { label: "Position", value: employee.position },
            { label: "Working Shift", value: employee.workingShiftId?.toString() },

            { label: "Work Status", value: employee.workStatus },
            { label: "Department", value: department },
            { label: "Address", value: employee.currentAddress },
          ]}
        />
      </div>
    </div>
  );
}

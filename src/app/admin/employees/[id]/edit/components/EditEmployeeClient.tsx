"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "@/service/admin/employees.service";
import { employeeDetailKey } from "@/service/util/query-keys/employee";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import Heading from "@/components/Heading";
import EmployeeForm from "../../../components/form/EmployeeForm";

interface Props {
  employeeId: string;
}

export default function EditEmployeeClient({ employeeId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const profileHref = `/admin/employees/${employeeId}`;

  useEffect(() => {
    if (!open) router.push(profileHref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { data, isFetching } = useQuery({
    queryKey: employeeDetailKey(Number(employeeId)),
    queryFn: () => getEmployeeById(Number(employeeId)),
    enabled: !!employeeId,
  });

  const employee = data?.employee;

  if (isFetching && !employee) {
    return <LoadingOverlay isLoading fullScreen />;
  }

  if (!employee) {
    return <div className="flex items-center justify-center h-60 text-muted-foreground">Employee not found</div>;
  }

  const fullNameEn = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();

  return (
    <div className="space-y-6">
      <Heading
        title={`Update ${fullNameEn || "Employee"}`}
        description="Review and update this employee's information"
      />
      <EmployeeForm setOpen={setOpen} employee={employee} />
    </div>
  );
}

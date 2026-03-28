"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IEmployee } from "@/types/admin/employee";
import { useDataTable } from "@/hooks/use-data-table";
import { employeeColumns } from "./employeeColumns";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useMutateEmployee } from "@/stores/admin/useMutateEmployee";
import SharedDialog from "@/components/shared/SharedDialog";
import EmployeeForm from "./form/EmployeeForm";
import { Button } from "@/components/ui/button";
import { PenIcon, Plus, PlusIcon, TrashIcon } from "lucide-react";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";

const EmployeeClient = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isEmployeeForm, setIsEmployeeForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [employee, setEmployee] = useState<IEmployee | undefined>(undefined);

  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: any) => {},
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IEmployee) => {
        setIsDelete(true);
        setEmployee(value);
      },
    },
  ];

  const { table } = useDataTable<IEmployee, unknown>({
    columns: employeeColumns(actionButton),
  });

  const { deleteEmployee } = useMutateEmployee();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteEmployee(
      { employeeId: employee?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setEmployee(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div>
      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions
            actions={[
              {
                name: "Create",
                icon: PlusIcon,
                event: () => {
                  setIsEmployeeForm(true);
                },
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        title={"Delete Employee"}
        setOpen={setIsDelete}
        open={isDelete}
        submitEvent={handleDelete}
        isSubmit
        submitTitle="Yes, Delete"
        className="bg-red-500"
        isLoading={isLoading}
        width="50%"
      >
        <p>
          This will remove employee name
          <span className="font-bold">
            {employee?.lastName} {employee?.firstName}
          </span>
        </p>
      </SharedDialog>

      <SharedDialog
        setOpen={() => setIsEmployeeForm(false)}
        open={isEmployeeForm}
        title="Create Employee"
        isCancel={false}
      >
        <EmployeeForm setOpen={setIsEmployeeForm} />
      </SharedDialog>
    </div>
  );
};

export default EmployeeClient;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IEmployee } from "@/types/admin/employee";
import { useDataTable } from "@/hooks/use-data-table";
import { employeeColumns } from "./columns";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { useMutateEmployee } from "@/stores/admin/useMutateEmployee";
import SharedDialog from "@/components/shared/SharedDialog";
import EmployeeForm from "./form/EmployeeForm";
import { EyeIcon, PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import EmployeeView from "./view/EmployeeView";
import TerminationForm from "./termination/TerminationForm";

const EmployeeClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmployeeForm, setIsEmployeeForm] = useState(false);
  const [isEmployeeView, setIsEmployeeView] = useState(false);
  const [isTerminate, setIsTerminate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [employee, setEmployee] = useState<IEmployee | undefined>(undefined);

  const actionButton = [
    {
      name: "View",
      icon: EyeIcon,
      event: (value: IEmployee) => {
        setEmployee(value);
        setIsEmployeeView(true);
      },
    },
    {
      name: "Terminate",
      icon: EyeIcon,
      event: (value: IEmployee) => {
        setEmployee(value);
        setIsTerminate(true);
      },
    },
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IEmployee) => {
        setEmployee(value);
        setIsEmployeeForm(true);
      },
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
                  setEmployee(undefined);
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
        setOpen={() => {
          setIsEmployeeForm(false);
          setEmployee(undefined);
        }}
        open={isEmployeeForm}
        title={employee ? "Update Employee" : "Create Employee"}
        isCancel={false}
        width="90%"
        height="95%"
      >
        <EmployeeForm setOpen={setIsEmployeeForm} employee={employee} />
      </SharedDialog>

      <SharedDialog
        setOpen={() => {
          setIsEmployeeView(false);
          setEmployee(undefined);
        }}
        open={isEmployeeView}
        title="Employee Details"
        isCancel={false}
        width="85%"
        height="95%"
      >
        <EmployeeView employee={employee ?? null} />
      </SharedDialog>

      <SharedDialog
        setOpen={() => {
          setIsTerminate(false);
          setEmployee(undefined);
        }}
        open={isTerminate}
        title="Terminate Employee"
        isCancel={false}
        width="85%"
        height="95%"
      >
        <TerminationForm
          setOpen={(open) => {
            setIsTerminate(open);
            if (!open) setEmployee(undefined);
          }}
          employee={employee ?? null}
        />
      </SharedDialog>
    </div>
  );
};

export default EmployeeClient;

"use client";
import { useState } from "react";
import { IWorkingShift } from "@/types/admin/working-shift";
import { useMutateWorkingShift } from "@/stores/admin/useMutateWorkingShift";
import { CustomBarChart } from "@/components/CustomBarChart";
import { useDataTable } from "@/hooks/use-data-table";
import { IEmployee } from "@/types/admin/employee";
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import SharedDialog from "@/components/shared/SharedDialog";
import WorkingShiftForm from "./form/RunPayrollForm";
import { payrollColumns } from "./columns";
import RunPayrollForm from "./form/RunPayrollForm";

interface Props {}
const PayrollClient = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const [isDelete, setIsDelete] = useState(false);

  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IWorkingShift) => {},
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IWorkingShift) => {},
    },
  ];

  const { table } = useDataTable({
    columns: payrollColumns(actionButton),
  });

  return (
    <div>
      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions
            actions={[
              {
                name: "Run Payroll",
                icon: PlusIcon,
                event: () => {
                  setIsOpen(true);
                  setActionType("RUN_PAYROLL");
                },
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        setOpen={() => setIsOpen(false)}
        open={isOpen}
        title="Run Payroll Details"
        isCancel={false}
        width="50%"
      >
        {actionType === "RUN_PAYROLL" && <RunPayrollForm onSuccess={() => setIsOpen(false)} />}
      </SharedDialog>
    </div>
  );
};

export default PayrollClient;

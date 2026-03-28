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
import WorkingShiftForm from "./WorkingShiftForm";
import { workingShiftColumns } from "./columns";

const shifts = [
  { id: 1, name: "Day Shift", employeeCount: 120 },
  { id: 2, name: "Night Shift", employeeCount: 80 },
  { id: 3, name: "Morning Shift", employeeCount: 42 },
];
const chartData = shifts.map((d) => ({
  name: d.name,
  value: d.employeeCount ?? 0,
}));

interface Props {}
const WorkingShiftClient = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isForm, setIsForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [workingShift, setWorkingShift] = useState<IWorkingShift | undefined>(
    undefined,
  );

  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IWorkingShift) => {
        setIsForm(true);
        setWorkingShift(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IWorkingShift) => {
        setIsDelete(true);
        setWorkingShift(value);
      },
    },
  ];

  const { table } = useDataTable<IEmployee, unknown>({
    columns: workingShiftColumns(actionButton),
  });

  const { deleteWorkingShift } = useMutateWorkingShift();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteWorkingShift(
      { workingShiftId: workingShift?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setWorkingShift(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 mb-2">
        <CustomBarChart title="Employees per shift" data={chartData} />
      </div>

      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions
            actions={[
              {
                name: "Create",
                icon: PlusIcon,
                event: () => {
                  setIsForm(true);
                },
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        setOpen={() => {
          setIsForm(false);
          setWorkingShift(undefined);
        }}
        open={isForm}
        title={`${workingShift ? "Update" : "Create"} Working Shift`}
        isCancel={false}
      >
        <WorkingShiftForm initialData={undefined} setOpen={setIsForm} />
      </SharedDialog>

      <SharedDialog
        title={"Delete Working Shift"}
        setOpen={setIsDelete}
        open={isDelete}
        submitEvent={handleDelete}
        isSubmit
        submitTitle="Yes, Delete"
        className="bg-red-500"
        isLoading={isLoading}
        width="50%"
      >
        <p>This will remove the {workingShift?.name}</p>
      </SharedDialog>
    </div>
  );
};

export default WorkingShiftClient;

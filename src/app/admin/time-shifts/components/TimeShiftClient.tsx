"use client";
import { useState } from "react";
import { ITimeShift } from "@/types/admin/time-shift";
// import { useMutateTimeShift } from "@/stores/admin/useMutateTimeShift";
import { CustomBarChart } from "@/components/CustomBarChart";
import { useDataTable } from "@/hooks/use-data-table";
import { IEmployee } from "@/types/admin/employee";
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import SharedDialog from "@/components/shared/SharedDialog";
import { timeShiftColumns } from "./columns";
import TimeShiftForm from "./form/TimeShiftForm";

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
const TimeShiftClient = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isForm, setIsForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [timeShift, setTimeShift] = useState<ITimeShift | undefined>(undefined);

  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: ITimeShift) => {
        setIsForm(true);
        setTimeShift(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: ITimeShift) => {
        setIsDelete(true);
        setTimeShift(value);
      },
    },
  ];

  const { table } = useDataTable({
    columns: timeShiftColumns(actionButton),
  });

  // const { deleteTimeShift } = useMutateTimeShift();

  const handleDelete = async () => {
    // setIsLoading(true);
    // await deleteTimeShift(
    //   { timeShiftId: timeShift?.id },
    //   {
    //     onSuccess: () => {
    //       setIsDelete(false);
    //       setTimeShift(undefined);
    //     },
    //     onSettled: () => {
    //       setIsLoading(false);
    //     },
    //   },
    // );
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
                  setTimeShift(undefined);
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
          setTimeShift(undefined);
        }}
        open={isForm}
        title={`${timeShift ? "Update" : "Create"} Working Shift`}
        isCancel={false}
      >
        <TimeShiftForm initialData={timeShift} onSuccess={() => setIsForm(false)} />
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
        <p>This will remove the {timeShift?.name}</p>
      </SharedDialog>
    </div>
  );
};

export default TimeShiftClient;

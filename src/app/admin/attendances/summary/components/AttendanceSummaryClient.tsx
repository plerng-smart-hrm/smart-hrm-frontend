"use client";

import { attendanceSummaryColumns } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { IAttendanceSummary } from "@/types/admin/attendance-summary";

const AttendanceSummaryClient = () => {
  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IAttendanceSummary) => {},
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IAttendanceSummary) => {},
    },
  ];

  const { table } = useDataTable({
    columns: attendanceSummaryColumns(actionButton),
  });

  return (
    <div>
      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions
            actions={[
              {
                name: "Create",
                icon: PlusIcon,
                event: () => {},
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>
    </div>
  );
};

export default AttendanceSummaryClient;

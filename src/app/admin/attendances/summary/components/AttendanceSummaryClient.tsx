"use client";

import { attendanceSummaryColumns } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import { CalendarSyncIcon, PenIcon, TrashIcon } from "lucide-react";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { IAttendanceSummary } from "@/types/admin/attendance-summary";
import SharedDialog from "@/components/shared/SharedDialog";
import { useState } from "react";
import TriggerAttendanceSummaryForm from "./form/TriggerAttendanceSummaryForm";

const AttendanceSummaryClient = () => {
  const [isTrigger, setIsTrigger] = useState(false);

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
                name: "Generate Summary",
                icon: CalendarSyncIcon,
                event: () => setIsTrigger(true),
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        setOpen={() => setIsTrigger(false)}
        open={isTrigger}
        title="Generate Attendance Summary"
        isCancel={false}
        width="40%"
      >
        <TriggerAttendanceSummaryForm onClose={() => setIsTrigger(false)} />
      </SharedDialog>
    </div>
  );
};

export default AttendanceSummaryClient;

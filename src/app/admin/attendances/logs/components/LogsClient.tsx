"use client";

import { attendanceLogsColumns } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";

const LogsClient = () => {
  const { table } = useDataTable({
    columns: attendanceLogsColumns(),
  });

  return (
    <div>
      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions actions={[]} />
        </ToolBarDataTale>
      </BaseDataTable>
    </div>
  );
};

export default LogsClient;

"use client";

import React from "react";
import { CirclePlus, History, PenSquareIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/view/RenderView";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { IEmployee } from "@/types/admin/employee";
import { IWarning } from "@/types/admin/warning";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { useDataTableDetail } from "@/hooks/use-data-detail-table";
import { warningKeys } from "@/service/util/query-keys/warning";
import { warningColumns } from "../columns/warningColumns";
import WarningPanel from "../panels/WarningPanel";
import SharedDialog from "@/components/shared/SharedDialog";
import { useMutateWarning } from "@/stores/admin/useMutateWarning";

interface Props {
  employee: IEmployee;
}

export default function WarningTab({ employee }: Props) {
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [selectedWarning, setSelectWarning] = React.useState<IWarning | undefined>(undefined);

  const { data: warningData } = useQueryShared({
    url: `/v1/warnings/employee/${employee.id}`,
    key: `${warningKeys.list_warning}_employee_${employee.id}`,
    enable: !!employee.id,
  });

  const { deleteWarning } = useMutateWarning();

  const actionButton = [
    {
      name: "Edit",
      icon: PenSquareIcon,
      event: (value: IWarning) => {
        setPanelOpen(true);
        setSelectWarning(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IWarning) => {
        setSelectWarning(value);
        setIsDelete(true);
      },
    },
  ];

  const handleDelete = async () => {
    deleteWarning({ warningId: selectedWarning?.id });
  };

  const { table: subTable } = useDataTableDetail({
    columns: warningColumns(actionButton),
    queryData: warningData?.data ?? [],
  });

  return (
    <div>
      <div className="space-y-6">
        <WarningPanel open={panelOpen} setOpen={setPanelOpen} employeeId={employee.id!} initialData={selectedWarning} />

        <div className="flex justify-end gap-2">
          <Button
            className="flex items-center"
            size="sm"
            onClick={() => {
              setSelectWarning(undefined);
              setPanelOpen(true);
            }}
          >
            <CirclePlus className="size-4 mr-1" /> Add
          </Button>
        </div>

        <Section icon={<History />} title="Warning">
          <BaseDataTable table={subTable} isPage={false} />
        </Section>
      </div>

      <SharedDialog
        title={"Delete Warning"}
        setOpen={setIsDelete}
        open={isDelete}
        submitEvent={handleDelete}
        isSubmit
        submitTitle="Yes, Delete"
        className="bg-red-500"
        width="50%"
      >
        <p>
          This will delete <span className="font-bold">{selectedWarning?.remark}</span>
        </p>
      </SharedDialog>
    </div>
  );
}

"use client";
import { useState } from "react";

import { attAdjustmentColumns } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import { EyeIcon, PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { IAttAdjustment } from "@/types/admin/att-adjustment";
import { useMutateAttAdjustment } from "@/stores/admin/useMutateAttAdjustment";
import SharedDialog from "@/components/shared/SharedDialog";
import AttAdjustmentForm from "./form/AttAdjustmentForm";
import AttAdjustmentView from "./view/AttAdjustmentView";

interface Props {}
const AttAdjustmentClient = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [attAdjustment, setAttAdjustment] = useState<IAttAdjustment | undefined>(undefined);

  const actionButton = [
    {
      name: "View",
      icon: EyeIcon,
      event: (value: IAttAdjustment) => {
        setIsView(true);
        setAttAdjustment(value);
      },
    },
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IAttAdjustment) => {
        setIsOpen(true);
        setAttAdjustment(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IAttAdjustment) => {
        setIsDelete(true);
        setAttAdjustment(value);
      },
    },
  ];

  const { table } = useDataTable({
    columns: attAdjustmentColumns(actionButton),
  });

  const { deleteAttAdjustment } = useMutateAttAdjustment();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteAttAdjustment(
      { id: attAdjustment?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setAttAdjustment(undefined);
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
                  setIsOpen(true);
                },
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        setOpen={() => setIsOpen(false)}
        open={isOpen}
        title={`${attAdjustment ? "Update" : "Create"} Attendance Adjustment`}
        isCancel={false}
      >
        <AttAdjustmentForm onSuccess={() => setIsOpen(false)} initialData={attAdjustment} />
      </SharedDialog>
      <SharedDialog
        setOpen={() => setIsView(false)}
        open={isView}
        title="Attendance Adjustment Details"
        isCancel={false}
        width="85%"
        height="95%"
      >
        <AttAdjustmentView initialData={attAdjustment} />
      </SharedDialog>

      <SharedDialog
        title={"Delete AttAdjustment"}
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
          This will remove attAdjustment
          <span className="font-bold">{attAdjustment?.id}</span>
        </p>
      </SharedDialog>
    </div>
  );
};

export default AttAdjustmentClient;

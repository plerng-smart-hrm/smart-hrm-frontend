"use client";

import { useState } from "react";
import { useMutateDepartment } from "@/stores/admin/useMutateDepartment";
import { IDepartment } from "@/types/admin";
import { departmentColumns } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import SharedDialog from "@/components/shared/SharedDialog";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import DepartmentForm from "./form/DepartmentForm";

const DepartmentClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [department, setDepartment] = useState<IDepartment | undefined>(
    undefined,
  );

  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IDepartment) => {
        setIsOpen(true);
        setDepartment(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IDepartment) => {
        setIsDelete(true);
        setDepartment(value);
      },
    },
  ];

  const { table } = useDataTable({
    columns: departmentColumns(actionButton),
  });

  const { deleteDepartment } = useMutateDepartment();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteDepartment(
      { departmentId: department?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setDepartment(undefined);
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
        title={"Delete Department"}
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
          This will remove department name
          <span className="font-bold">{department?.name}</span>
        </p>
      </SharedDialog>

      <SharedDialog
        title={`${department ? "Update" : "Create"} Department`}
        setOpen={setIsOpen}
        open={isOpen}
        isSubmit={false}
        isCancel={false}
        isLoading={isLoading}
        width="40%"
      >
        <DepartmentForm
          initialData={department}
          onSuccess={() => setIsOpen(false)}
        />
      </SharedDialog>
    </div>
  );
};

export default DepartmentClient;

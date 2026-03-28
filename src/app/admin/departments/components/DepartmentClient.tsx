"use client";

import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useMutateDepartment } from "@/stores/admin/useMutateDepartment";
import { IDepartment } from "@/types/admin";
import { getAllDepartments } from "@/service/admin/departments.service";
import { departmentColumns } from "./columns";
import DepartmentDialog from "./DepartmentDialog";
import { useDataTable } from "@/hooks/use-data-table";
import { queryKeys } from "@/service/util/query-key";
import { IEmployee } from "@/types/admin/employee";
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import router from "next/router";
import SharedDialog from "@/components/shared/SharedDialog";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";

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

  const { delete: deleteDepartmentMutate } = useMutateDepartment();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteDepartmentMutate(
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
    </div>
  );
};

export default DepartmentClient;

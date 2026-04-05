"use client";

import { useState } from "react";
import { companyColumns } from "./columns";
import { ICompany } from "@/types/admin";
import { useMutateCompany } from "@/stores/admin/useMutateCompany";
import CompanyDialog from "./CompanyDialog";
import SharedDialog from "@/components/shared/SharedDialog";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { useDataTable } from "@/hooks/use-data-table";
import { PenIcon, TrashIcon, PlusIcon } from "lucide-react";
import { IActions } from "@/components/shared/Actions";

interface Props {}
const CompanyClients = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [company, setCompany] = useState<ICompany | undefined>(undefined);

  const actionButton: IActions[] = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: ICompany) => {
        setIsOpen(true);
        setCompany(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      variant: "destructive",
      event: (value: ICompany) => {
        setIsDelete(true);
        setCompany(value);
      },
    },
  ];

  const { table } = useDataTable({
    columns: companyColumns(actionButton),
  });

  const { delete: deleteCompanyMutate } = useMutateCompany();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteCompanyMutate(
      { companyId: company?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setCompany(undefined);
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
        title={"Delete Employee"}
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
          This will remove employee name
          <span className="font-bold">{company?.name}</span>
        </p>
      </SharedDialog>

      {isOpen && (
        <CompanyDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setCompany(undefined);
          }}
          companyId={company?.id}
        />
      )}
    </div>
  );
};

export default CompanyClients;

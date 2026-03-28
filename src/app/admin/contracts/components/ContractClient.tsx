"use client";
import { useState } from "react";
import { useMutateContract } from "@/stores/admin/useMutateContract";
import { IContract } from "@/types/admin";
import { contractColumns } from "./columns";
import { DashboardCard } from "@/components/DashboardCard";
import { useDataTable } from "@/hooks/use-data-table";
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import SharedDialog from "@/components/shared/SharedDialog";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";

interface Props {}
const ContractClient = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [contract, setContract] = useState<IContract | undefined>(undefined);

  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IContract) => {
        setIsOpen(true);
        setContract(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IContract) => {
        setIsDelete(true);
        setContract(value);
      },
    },
  ];

  const { table } = useDataTable({
    columns: contractColumns(actionButton),
  });

  const { delete: deleteContractMutate } = useMutateContract();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteContractMutate(
      { contractId: contract?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setContract(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div>
      <div className="grid gap-4 grid-cols-4 mb-4">
        <DashboardCard
          title="Contract UDC"
          value={60}
          icon="/icons/contract.png"
        />

        <DashboardCard
          title="Contract FDC"
          value={60}
          icon="/icons/contract.png"
        />

        <DashboardCard title="Near Expired" value={60} icon="/icons/time.png" />

        <DashboardCard
          title="Pending Severance"
          value={60}
          icon="/icons/pay.png"
        />
      </div>

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
        title={"Delete Contract"}
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
          This will remove contract
          <span className="font-bold">{contract?.id}</span>
        </p>
      </SharedDialog>
    </div>
  );
};

export default ContractClient;

"use client";
import { useState } from "react";
import { useMutateContract } from "@/stores/admin/useMutateContract";
import { DashboardCard } from "@/components/DashboardCard";
import { useDataTable } from "@/hooks/use-data-table";
import { EyeIcon, PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import SharedDialog from "@/components/shared/SharedDialog";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { IContract } from "@/types/admin/contract";
import { payrollReportColumns } from "./columns";

interface Props {}
const PayrollReportClient = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [contract, setContract] = useState<IContract | undefined>(undefined);

  const actionButton = [
    {
      name: "View",
      icon: EyeIcon,
      event: (value: IContract) => {
        setIsView(true);
        setContract(value);
      },
    },
  ];

  const { table } = useDataTable({
    columns: payrollReportColumns(actionButton),
  });

  return (
    <div>
      {/* <div className="grid gap-4 grid-cols-4 mb-4">
        <DashboardCard title="Contract UDC" value={60} icon="/icons/contract.png" />

        <DashboardCard title="Contract FDC" value={60} icon="/icons/contract.png" />

        <DashboardCard title="Near Expired" value={60} icon="/icons/time.png" />

        <DashboardCard title="Pending Severance" value={60} icon="/icons/pay.png" />
      </div> */}

      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions actions={[]} />
        </ToolBarDataTale>
      </BaseDataTable>
    </div>
  );
};

export default PayrollReportClient;

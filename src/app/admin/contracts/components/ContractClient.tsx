"use client";

import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ContractDialog from "./ContractDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useMutateContract } from "@/stores/admin/useMutateContract";
import { IContract } from "@/types/admin";
import { getAllContracts } from "@/service/admin/contracts.service";
import { contractColumns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { DashboardCard } from "@/components/DashboardCard";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const ContractClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [contract, setContract] = useState<IContract | undefined>(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.contracts.list(pageIndex, pageSize),
    queryFn: () => getAllContracts(pageIndex, pageSize),
  });

  const contracts = data?.contracts ?? [];
  const pagination = data?.pagination;

  const cols = contractColumns({
    onEdit: (row) => {
      setIsOpen(true);
      setContract(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setContract(row);
    },
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
      }
    );
  };

  const handlePaginationChange = ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    const params = new URLSearchParams(searchParams);
    params.set("pageIndex", String(pageIndex));
    params.set("pageSize", String(pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <div>
      {isOpen && (
        <ContractDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setContract(undefined);
          }}
          contractId={contract?.id}
        />
      )}

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Category"
          description={`This will remove`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

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

      <DataTable
        columns={cols}
        data={contracts}
        serverMode={true}
        pageCount={pagination?.totalPages ?? 0}
        onPaginationChange={handlePaginationChange}
        initialPageIndex={pageIndex}
        initialPageSize={pageSize}
        createLabel="Create"
        onCreateClick={() => {
          setIsOpen(true);
        }}
      />
    </div>
  );
};

export default ContractClient;

"use client";

import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { companyColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CompanyDialog from "./CompanyDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ICompany } from "@/types/admin";
import { getAllCompanies } from "@/service/admin/companies.service";
import { useMutateCompany } from "@/stores/admin/useMutateCompany";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const CompanyClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [company, setCompany] = useState<ICompany | undefined>(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.companies.list(pageIndex, pageSize),
    queryFn: () => getAllCompanies(pageIndex, pageSize),
  });

  const companies = data?.companies ?? [];
  const pagination = data?.pagination;

  const cols = companyColumns({
    onEdit: (row) => {
      setIsOpen(true);
      setCompany(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setCompany(row);
    },
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
        <CompanyDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setCompany(undefined);
          }}
          companyId={company?.id}
        />
      )}

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Category"
          description={`This will remove the ${company?.name}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={companies}
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

export default CompanyClient;

"use client";

import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { employeeColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useMutateEmployee } from "@/stores/admin/useMutateEmployee";
import { IEmployee } from "@/types/admin/employee";
import { getAllEmployees } from "@/service/admin/employees.service";
import { queryKeys } from "@/service/util/query-keys/employee";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const EmployeeClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isDelete, setIsDelete] = useState(false);
  const [employee, setEmployee] = useState<IEmployee | undefined>(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.employees.list(pageIndex, pageSize),
    queryFn: () => getAllEmployees(pageIndex, pageSize),
  });

  const employees = data?.employees ?? [];
  const pagination = data?.pagination;

  const cols = employeeColumns({
    onEdit: (row) => {
      router.push(`/admin/employees/${row.id}`);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setEmployee(row);
    },
  });
  const { delete: deleteEmployeeMutate } = useMutateEmployee();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteEmployeeMutate(
      { employeeId: employee?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setEmployee(undefined);
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
      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Employee"
          description={`This will remove employee name ${employee?.lastName} ${employee?.firstName}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={employees}
        serverMode={true}
        pageCount={pagination?.totalPages ?? 0}
        onPaginationChange={handlePaginationChange}
        initialPageIndex={pageIndex}
        initialPageSize={pageSize}
        createLabel="Create"
        onCreateClick={() => {
          router.push("/admin/employees/new");
        }}
      />
    </div>
  );
};

export default EmployeeClient;

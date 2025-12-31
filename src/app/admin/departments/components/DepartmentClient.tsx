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
import { queryKeys } from "@/service/util/query-keys/department";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const DepartmentClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [department, setDepartment] = useState<IDepartment | undefined>(
    undefined
  );

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.departments.list(pageIndex, pageSize),
    queryFn: () => getAllDepartments(pageIndex, pageSize),
  });

  const departments = data?.departments ?? [];
  const pagination = data?.pagination;

  const cols = departmentColumns({
    onEdit: (row) => {
      setIsOpen(true);
      setDepartment(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setDepartment(row);
    },
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
        <DepartmentDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setDepartment(undefined);
          }}
          departmentId={department?.id}
        />
      )}

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Category"
          description={`This will remove the ${department?.name}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={departments}
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

export default DepartmentClient;

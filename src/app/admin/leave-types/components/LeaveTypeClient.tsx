"use client";

import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { leaveTypeColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LeaveTypeDialog from "./LeaveTypeDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useMutateLeaveType } from "@/stores/admin/useMutateLeaveType";
import { ILeaveType } from "@/types/admin";
import { getAllLeaveTypes } from "@/service/admin/leave-types.service";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const LeaveTypeClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [leaveType, setLeaveType] = useState<ILeaveType | undefined>(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.leaveTypes.list(pageIndex, pageSize),
    queryFn: () => getAllLeaveTypes(pageIndex, pageSize),
  });

  const LeaveTypes = data?.leaveTypes ?? [];
  const pagination = data?.pagination;

  const cols = leaveTypeColumns({
    onEdit: (row) => {
      setIsOpen(true);
      setLeaveType(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setLeaveType(row);
    },
  });
  const { delete: deleteLeaveTypeMutate } = useMutateLeaveType();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteLeaveTypeMutate(
      { leaveTypeId: leaveType?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setLeaveType(undefined);
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
        <LeaveTypeDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setLeaveType(undefined);
          }}
          leaveTypeId={leaveType?.id}
        />
      )}

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Category"
          description={`This will remove the ${leaveType?.name}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={LeaveTypes}
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

export default LeaveTypeClient;

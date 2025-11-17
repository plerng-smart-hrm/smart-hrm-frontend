"use client";

import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { leaveRequestColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useMutateLeaveRequest } from "@/stores/admin/useMutateLeaveRequest";
import { ILeaveRequest } from "@/types/admin";
import { getAllLeaveRequests } from "@/service/admin/leave-requests.service";
import LeaveRequestDialog from "./LeaveRequestDialog";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}

const LeaveRequestClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState<ILeaveRequest | undefined>(
    undefined
  );

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.leaveRequests.list(pageIndex, pageSize),
    queryFn: () => getAllLeaveRequests(pageIndex, pageSize),
  });

  const LeaveRequests = data?.leaveRequests ?? [];
  const pagination = data?.pagination;

  const cols = leaveRequestColumns({
    onEdit: (row) => {
      setIsOpen(true);
      setLeaveRequest(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setLeaveRequest(row);
    },
  });
  const { delete: deleteLeaveRequestMutate } = useMutateLeaveRequest();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteLeaveRequestMutate(
      { leaveRequestId: leaveRequest?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setLeaveRequest(undefined);
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
        <LeaveRequestDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setLeaveRequest(undefined);
          }}
          leaveRequestId={leaveRequest?.id}
        />
      )}

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Leave Request"
          description={`This will remove the ${leaveRequest?.employee?.firstName}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={LeaveRequests}
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

export default LeaveRequestClient;

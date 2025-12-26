"use client";
import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { attendanceSummaryColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IAttendanceSummary } from "@/types/admin";
import { useMutateAttendanceSummary } from "@/stores/admin/useMutateAttendanceSummary";
import { getAllAttendanceSummaries } from "@/service/admin/attendance-summary.service";

export const attendanceLogsReport = [
  { date: "2025-11-01", checkIn: 52, late: 4 },
  { date: "2025-11-02", checkIn: 49, late: 6 },
  { date: "2025-11-03", checkIn: 55, late: 2 },
  { date: "2025-11-04", checkIn: 58, late: 3 },
  { date: "2025-11-05", checkIn: 60, late: 5 },
  { date: "2025-11-06", checkIn: 54, late: 4 },
  { date: "2025-11-07", checkIn: 62, late: 1 },
  { date: "2025-11-08", checkIn: 57, late: 3 },
  { date: "2025-11-09", checkIn: 59, late: 6 },
  { date: "2025-11-10", checkIn: 63, late: 2 },
  { date: "2025-11-11", checkIn: 61, late: 4 },
  { date: "2025-11-12", checkIn: 64, late: 2 },
  { date: "2025-11-13", checkIn: 66, late: 3 },
  { date: "2025-11-14", checkIn: 63, late: 5 },
  { date: "2025-11-15", checkIn: 62, late: 2 },
];

interface Props {
  initPageIndex: number;
  initPageSize: number;
}

const AttendanceSummaryClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [attendanceSummary, setAttendanceSummary] = useState<
    IAttendanceSummary | undefined
  >(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.attendanceSummaries.list(pageIndex, pageSize),
    queryFn: () => getAllAttendanceSummaries(pageIndex, pageSize),
  });

  const attendanceSummaries = data?.attendanceSummaries ?? [];
  const pagination = data?.pagination;

  const cols = attendanceSummaryColumns({
    onDelete: (row) => {
      setAttendanceSummary(row);
    },
  });

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
      <DataTable
        columns={cols}
        data={attendanceSummaries}
        serverMode={true}
        pageCount={pagination?.totalPages ?? 0}
        onPaginationChange={handlePaginationChange}
        initialPageIndex={pageIndex}
        initialPageSize={pageSize}
      />
    </div>
  );
};

export default AttendanceSummaryClient;

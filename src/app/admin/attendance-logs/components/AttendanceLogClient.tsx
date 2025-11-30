"use client";
import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { attendanceLogColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IAttendanceLog } from "@/types/admin";
import { getAllAttendanceLogs } from "@/service/admin/attendance-log.service";
import { useMutateAttendanceLog } from "@/stores/admin/useMutateAttendanceLog";
import AttendanceLineChart from "@/components/charts/AttendanceLineChart";
import AttendanceBarChart from "@/components/charts/AttendanceBarChart";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/utils/time";
import { DatePicker } from "@/components/DatePicker";
import { TimePicker } from "@/components/TimePicker";
import { FunnelIcon, RotateCcwIcon } from "lucide-react";

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
  initStartDateTime?: string;
  initEndDateTime?: string;
}

const AttendanceLogClient = ({
  initPageIndex,
  initPageSize,
  initStartDateTime,
  initEndDateTime,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [startDateTime, setStartDateTime] = useState<Date | null>(
    initStartDateTime ? new Date(initStartDateTime) : null
  );
  const [endDateTime, setEndDateTime] = useState<Date | null>(
    initEndDateTime ? new Date(initEndDateTime) : null
  );

  // Local state for UI (not triggering API calls)
  const [localStartDate, setLocalStartDate] = useState<Date | null>(
    initStartDateTime ? new Date(initStartDateTime) : null
  );
  const [localEndDate, setLocalEndDate] = useState<Date | null>(
    initEndDateTime ? new Date(initEndDateTime) : null
  );

  const [isDelete, setIsDelete] = useState(false);
  const [attendanceLog, setAttendanceLog] = useState<
    IAttendanceLog | undefined
  >(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.attendanceLogs.list(
      pageIndex,
      pageSize,
      startDateTime?.toDateString(),
      endDateTime?.toDateString()
    ),
    queryFn: () =>
      getAllAttendanceLogs(
        pageIndex,
        pageSize,
        startDateTime?.toDateString(),
        endDateTime?.toDateString()
      ),
  });

  const attendanceLogs = data?.attendanceLogs ?? [];
  const pagination = data?.pagination;

  const cols = attendanceLogColumns({
    onDelete: (row) => {
      setIsDelete(true);
      setAttendanceLog(row);
    },
  });

  const { delete: deleteAttendanceLogMutate } = useMutateAttendanceLog();

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

  const handleApplyFilter = () => {
    setStartDateTime(localStartDate);
    setEndDateTime(localEndDate);

    const params = new URLSearchParams(searchParams);
    params.set("pageIndex", "0");

    if (localStartDate) {
      params.set("startDateTime", formatDateTime(localStartDate));
    } else {
      params.delete("startDateTime");
    }

    if (localEndDate) {
      params.set("endDateTime", formatDateTime(localEndDate));
    } else {
      params.delete("endDateTime");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilter = () => {
    setLocalStartDate(null);
    setLocalEndDate(null);
    setStartDateTime(null);
    setEndDateTime(null);

    const params = new URLSearchParams(searchParams);
    params.delete("startDateTime");
    params.delete("endDateTime");
    params.set("pageIndex", "0");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteAttendanceLogMutate(
      { attendanceLogId: attendanceLog?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setAttendanceLog(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
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
          title="Delete AttendanceLog"
          description={`This will remove the ${attendanceLog?.employee}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-12">
        <AttendanceBarChart data={attendanceLogsReport} />
        <AttendanceLineChart data={attendanceLogsReport} />
      </div>

      <DataTable
        columns={cols}
        data={attendanceLogs}
        serverMode={true}
        pageCount={pagination?.totalPages ?? 0}
        onPaginationChange={handlePaginationChange}
        initialPageIndex={pageIndex}
        initialPageSize={pageSize}
        extractAction={
          <div className="space-y-2">
            {/* First Row: Start Date/Time + Apply Button */}
            <div className="grid grid-cols-3 gap-4 items-end">
              {/* Start Date & Time */}
              <div className="space-y-1 col-span-2">
                <div className="flex gap-2">
                  <DatePicker
                    label=""
                    placeholder="Select start date"
                    value={localStartDate}
                    onChange={setLocalStartDate}
                  />
                  <TimePicker
                    label=""
                    value={localStartDate}
                    onChange={setLocalStartDate}
                  />
                </div>
              </div>

              {/* Apply Button */}
              <Button
                type="button"
                onClick={handleApplyFilter}
                className=" bg-green-500 w-12"
              >
                <FunnelIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Second Row: End Date/Time + Clear Filter */}
            <div className="grid grid-cols-3 gap-4 items-end">
              {/* End Date & Time */}
              <div className="space-y-1 col-span-2">
                <div className="flex gap-2">
                  <DatePicker
                    label=""
                    placeholder="Select end date"
                    value={localEndDate}
                    onChange={setLocalEndDate}
                  />
                  <TimePicker
                    label=""
                    value={localEndDate}
                    onChange={setLocalEndDate}
                  />
                </div>
              </div>

              {/* Clear Filter Button */}
              <Button
                variant="outline"
                onClick={handleClearFilter}
                className="bg-yellow-500 w-12"
              >
                <RotateCcwIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default AttendanceLogClient;

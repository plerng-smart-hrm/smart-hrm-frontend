import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getAllAttendanceLogs } from "@/service/admin/attendance-log.service";
import { getSearchParams } from "@/utils/searchParams";
import AttendanceLogClient from "./components/AttendanceLogClient";

interface Props {
  searchParams: Promise<{
    pageIndex?: string;
    pageSize?: string;
    startDateTime?: string;
    endDateTime?: string;
  }>;
}

const page = async ({ searchParams }: Props) => {
  const queryClient = getQueryClient();
  const { pageIndex, pageSize, startDateTime, endDateTime } = getSearchParams(
    await searchParams
  );

  await queryClient.prefetchQuery({
    queryKey: queryKeys.attendanceLogs.list(
      pageIndex,
      pageSize,
      startDateTime,
      endDateTime
    ),
    queryFn: () =>
      getAllAttendanceLogs(pageIndex, pageSize, startDateTime, endDateTime),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AttendanceLogClient initPageIndex={pageIndex} initPageSize={pageSize} />
    </HydrationBoundary>
  );
};

export default page;

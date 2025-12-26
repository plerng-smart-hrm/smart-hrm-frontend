import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSearchParams } from "@/utils/searchParams";
import { getAllAttendanceSummaries } from "@/service/admin/attendance-summary.service";
import AttendanceSummaryClient from "./components/AttendanceSummaryClient";

interface Props {
  searchParams: Promise<{
    pageIndex?: string;
    pageSize?: string;
  }>;
}

const page = async ({ searchParams }: Props) => {
  const queryClient = getQueryClient();
  const { pageIndex, pageSize } = getSearchParams(await searchParams);

  await queryClient.prefetchQuery({
    queryKey: queryKeys.attendanceSummaries.list(pageIndex, pageSize),
    queryFn: () => getAllAttendanceSummaries(pageIndex, pageSize),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AttendanceSummaryClient
        initPageIndex={pageIndex}
        initPageSize={pageSize}
      />
    </HydrationBoundary>
  );
};

export default page;

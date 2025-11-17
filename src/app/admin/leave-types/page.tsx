import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSearchParams } from "@/utils/searchParams";
import { getAllLeaveTypes } from "@/service/admin/leave-types.service";
import LeaveTypeClient from "./components/LeaveTypeClient";

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
    queryKey: queryKeys.leaveTypes.list(pageIndex, pageSize),
    queryFn: () => getAllLeaveTypes(pageIndex, pageSize),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LeaveTypeClient initPageIndex={pageIndex} initPageSize={pageSize} />
    </HydrationBoundary>
  );
};

export default page;

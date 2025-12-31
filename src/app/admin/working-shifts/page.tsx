import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSearchParams } from "@/utils/searchParams";
import WorkingShiftClient from "./components/WorkingShiftClient";
import { getAllWorkingShifts } from "@/service/admin/working-shifts.service";
import { queryKeys } from "@/service/util/query-keys/working-shift";

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
    queryKey: queryKeys.workingShifts.list(pageIndex, pageSize),
    queryFn: () => getAllWorkingShifts(pageIndex, pageSize),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkingShiftClient initPageIndex={pageIndex} initPageSize={pageSize} />
    </HydrationBoundary>
  );
};

export default page;

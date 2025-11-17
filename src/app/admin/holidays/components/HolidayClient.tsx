"use client";
import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getAllHolidays } from "@/service/admin/device.service";
import { holidayColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DashboardCard } from "@/components/DashboardCard";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const HolidayClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.holidays.all(pageIndex, pageSize),
    queryFn: () => getAllHolidays(pageIndex, pageSize),
  });

  const holidays = data?.holidays ?? [];
  const pagination = data?.pagination;

  const cols = holidayColumns({
    onEdit: (row) => {},
    onDelete: (row) => {},
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
    // Store 0-based pageIndex in URL for consistency
    params.set("pageIndex", String(pageIndex));
    params.set("pageSize", String(pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-4 mb-4">
        <DashboardCard
          title="Total Holiday"
          value={60}
          icon="/icons/holidays.png"
        />

        <DashboardCard
          title="Public Holiday"
          value={60}
          icon="/icons/public.png"
        />

        <DashboardCard
          title="Company Holiday"
          value={60}
          icon="/icons/company.png"
        />

        <DashboardCard
          title="Up Coming"
          value={60}
          icon="/icons/upcoming.png"
        />
      </div>

      <DataTable
        columns={cols}
        data={holidays}
        serverMode={true}
        pageCount={pagination?.totalPages ?? 0}
        onPaginationChange={handlePaginationChange}
        initialPageIndex={pageIndex}
        initialPageSize={pageSize}
        createLabel="Create"
        onCreateClick={() => {}}
      />
    </div>
  );
};

export default HolidayClient;

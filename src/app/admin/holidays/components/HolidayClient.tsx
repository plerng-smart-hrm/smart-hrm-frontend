"use client";
import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { holidayColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DashboardCard } from "@/components/DashboardCard";
import { getAllHolidays } from "@/service/admin/holiday.service";
import { IHoliday } from "@/types/admin";
import { useMutateHoliday } from "@/stores/admin/useMutateHoliday";
import HolidayDialog from "./HolidayDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";

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

  const [isForm, setIsForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [holiday, setHoliday] = useState<IHoliday | undefined>(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.holidays.list(pageIndex, pageSize),
    queryFn: () => getAllHolidays(pageIndex, pageSize),
  });

  const holidays = data?.holidays ?? [];
  const pagination = data?.pagination;

  const cols = holidayColumns({
    onEdit: (row) => {
      setIsForm(true);
      setHoliday(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setHoliday(row);
    },
  });

  const { delete: deleteHolidayMutate } = useMutateHoliday();

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

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteHolidayMutate(
      { holidayId: holiday?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setHoliday(undefined);
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
      {isForm && (
        <HolidayDialog
          isOpen={isForm}
          setIsOpen={() => {
            setIsForm(false);
            setHoliday(undefined);
          }}
          holidayId={holiday?.id}
        />
      )}
      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Device"
          description={`This will remove the ${holiday?.name}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
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
        onCreateClick={() => {
          setIsForm(true);
        }}
      />
    </div>
  );
};

export default HolidayClient;

"use client";
import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { workingShiftColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IWorkingShift } from "@/types/admin";
import { useMutateWorkingShift } from "@/stores/admin/useMutateWorkingShift";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { getAllWorkingShifts } from "@/service/admin/working-shifts.service";
import WorkingShiftDialog from "./WorkingShiftDialog";
import { CustomBarChart } from "@/components/CustomBarChart";

const shifts = [
  { id: 1, name: "Day Shift", employeeCount: 120 },
  { id: 2, name: "Night Shift", employeeCount: 80 },
  { id: 3, name: "Morning Shift", employeeCount: 42 },
];
const chartData = shifts.map((d) => ({
  name: d.name,
  value: d.employeeCount ?? 0,
}));

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const WorkingShiftClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isForm, setIsForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [workingShift, setWorkingShift] = useState<IWorkingShift | undefined>(
    undefined
  );

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.workingShifts.list(pageIndex, pageSize),
    queryFn: () => getAllWorkingShifts(pageIndex, pageSize),
  });

  const workingShifts = data?.workingShifts ?? [];
  const pagination = data?.pagination;

  const cols = workingShiftColumns({
    onEdit: (row) => {
      setIsForm(true);
      setWorkingShift(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setWorkingShift(row);
    },
  });

  const { delete: deleteWorkingShiftMutate } = useMutateWorkingShift();

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

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteWorkingShiftMutate(
      { workingShiftId: workingShift?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setWorkingShift(undefined);
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
        <WorkingShiftDialog
          isOpen={isForm}
          setIsOpen={() => {
            setIsForm(false);
            setWorkingShift(undefined);
          }}
          workingShiftId={workingShift?.id}
        />
      )}
      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Device"
          description={`This will remove the ${workingShift?.name}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <div className="grid grid-cols-2 mb-4">
        <CustomBarChart title="Employees per shift" data={chartData} />
      </div>

      <DataTable
        columns={cols}
        data={workingShifts}
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

export default WorkingShiftClient;

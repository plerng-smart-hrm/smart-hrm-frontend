"use client";

import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getAllDevices } from "@/service/admin/device.service";
import { deviceColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { RefreshCcwDotIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IDevice } from "@/types/admin";
import { useMutateDevice } from "@/stores/admin/useMutateDevice";
import DeviceDialog from "./DeviceDialog";
import { DashboardCard } from "@/components/DashboardCard";
import { DeviceBarChart } from "@/components/DeviceBarChart";

const devices = [
  { id: 1, name: "Device A", employeeCount: 122 },
  { id: 2, name: "Device B", employeeCount: 110 },
  { id: 2, name: "Device B", employeeCount: 114 },
  { id: 2, name: "Device B", employeeCount: 122 },
  { id: 2, name: "Device B", employeeCount: 300 },
  { id: 2, name: "Device B", employeeCount: 10 },
  { id: 2, name: "Device B", employeeCount: 100 },
  { id: 2, name: "Device B", employeeCount: 10 },
  { id: 2, name: "Device B", employeeCount: 98 },
  { id: 2, name: "Device B", employeeCount: 200 },
];

const chartData = devices.map((d) => ({
  name: d.name,
  value: d.employeeCount ?? 0,
}));

interface Props {
  initPageIndex: number;
  initPageSize: number;
}

const DeviceClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isForm, setIsForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [device, setDevice] = useState<IDevice | undefined>(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.devices.list(pageIndex, pageSize),
    queryFn: () => getAllDevices(pageIndex, pageSize),
  });

  const devices = data?.devices ?? [];
  const pagination = data?.pagination;

  const cols = deviceColumns({
    onEdit: (row) => {
      setIsForm(true);
      setDevice(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setDevice(row);
    },
  });

  const { delete: deleteDeviceMutate, sync: syncDeviceMutate } =
    useMutateDevice();

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

  const handleSyncDevice = async () => {
    await syncDeviceMutate();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteDeviceMutate(
      { deviceId: device?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setDevice(undefined);
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
        <DeviceDialog
          isOpen={isForm}
          setIsOpen={() => {
            setIsForm(false);
            setDevice(undefined);
          }}
          deviceId={device?.id}
        />
      )}
      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Device"
          description={`This will remove the ${device?.name}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-4">
        <div className="flex flex-col gap-2 md:col-span-1">
          <DashboardCard
            title="Offline"
            value={60}
            icon="/icons/wifi-slash.png"
          />

          <DashboardCard title="Online" value={60} icon="/icons/wifi.png" />
        </div>

        <div className="md:col-span-3">
          <DeviceBarChart data={chartData} />
        </div>
      </div>

      <DataTable
        columns={cols}
        data={devices}
        serverMode={true}
        pageCount={pagination?.totalPages ?? 0}
        onPaginationChange={handlePaginationChange}
        initialPageIndex={pageIndex}
        initialPageSize={pageSize}
        createLabel="Create"
        onCreateClick={() => {
          setIsForm(true);
        }}
        extractAction={
          <Button
            className="bg-cyan-500 hover:bg-cyan-400 cursor-pointer"
            onClick={handleSyncDevice}
          >
            <RefreshCcwDotIcon className="h-3 w-3" />
            Sync Devices
          </Button>
        }
      />
    </div>
  );
};

export default DeviceClient;

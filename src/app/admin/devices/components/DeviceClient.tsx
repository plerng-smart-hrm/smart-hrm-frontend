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
import { PenIcon, PlusIcon, RefreshCcwDotIcon, TrashIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IDevice } from "@/types/admin";
import { useMutateDevice } from "@/stores/admin/useMutateDevice";
import DeviceDialog from "./DeviceDialog";
import { DashboardCard } from "@/components/DashboardCard";
import { CustomBarChart } from "@/components/CustomBarChart";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { useDataTable } from "@/hooks/use-data-table";
import BaseDataTable from "@/components/shared/table/BaseDataTable";

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

const DeviceClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isForm, setIsForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [device, setDevice] = useState<IDevice | undefined>(undefined);

  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IDevice) => {
        setIsForm(true);
        setDevice(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IDevice) => {
        setIsDelete(true);
        setDevice(value);
      },
    },
  ];

  const { table } = useDataTable<IDevice, unknown>({
    columns: deviceColumns(actionButton),
  });

  const { delete: deleteDeviceMutate, sync: syncDeviceMutate } =
    useMutateDevice();

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
      },
    );
  };

  return (
    <div>
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
          <CustomBarChart title="Employees per device" data={chartData} />
        </div>
      </div>

      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions
            actions={[
              {
                name: "Create",
                icon: PlusIcon,
                event: () => {
                  // setIsEmployeeForm(true);
                },
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

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
    </div>
  );
};

export default DeviceClient;

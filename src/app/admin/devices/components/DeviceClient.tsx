"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { deviceColumns } from "./columns";
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import { IDevice } from "@/types/admin";
import { useMutateDevice } from "@/stores/admin/useMutateDevice";
import { DashboardCard } from "@/components/DashboardCard";
import { CustomBarChart } from "@/components/CustomBarChart";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { useDataTable } from "@/hooks/use-data-table";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import DeviceForm from "./form/DeviceForm";
import SharedDialog from "@/components/shared/SharedDialog";

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

  const { deleteDevice, syncDevice } = useMutateDevice();

  const handleSyncDevice = async () => {
    await syncDevice();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteDevice(
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
                  setDevice(undefined);
                  setIsForm(true);
                },
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        setOpen={() => setIsForm(false)}
        open={isForm}
        title={device ? "Update Device" : "Create Device"}
        isCancel={false}
      >
        <DeviceForm onSuccess={() => setIsForm(false)} initialData={device} />
      </SharedDialog>

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

      <SharedDialog
        title={"Delete Device"}
        setOpen={setIsDelete}
        open={isDelete}
        submitEvent={handleDelete}
        isSubmit
        submitTitle="Yes, Delete"
        className="bg-red-500"
        isLoading={isLoading}
        width="50%"
      >
        <p>
          This will remove device name
          <span className="font-bold">{device?.name}</span>
        </p>
      </SharedDialog>
    </div>
  );
};

export default DeviceClient;

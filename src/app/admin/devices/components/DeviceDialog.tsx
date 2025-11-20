"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getDeviceById } from "@/service/admin/device.service";
import DeviceForm from "./DeviceForm";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  deviceId?: number;
}
const DeviceDialog = ({ isOpen, setIsOpen, deviceId }: Props) => {
  const isEdit = !!deviceId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.devices.detail(deviceId),
    queryFn: () => getDeviceById(deviceId),
    enabled: isEdit,
  });

  const device = data?.device ?? undefined;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Device" : "Create Device"}</DialogTitle>
        </DialogHeader>
        <DeviceForm initialData={device} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDialog;

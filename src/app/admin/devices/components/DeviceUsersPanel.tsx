"use client";

import React from "react";
import { ServerCrash, TrashIcon, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SharedDialog from "@/components/shared/SharedDialog";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { useDataTableDetail } from "@/hooks/use-data-detail-table";
import { useMutateZkUser } from "@/stores/admin/useMutateZkUser";
import { IDevice } from "@/types/admin";
import { IZkUser } from "@/types/admin/zk-user";
import { zkUserColumns } from "./zkUserColumns";
import { zkKeys } from "@/service/util/query-keys/zk";

interface Props {
  device?: IDevice;
}

export default function DeviceUsersPanel({ device }: Props) {
  const [deleteTarget, setDeleteTarget] = React.useState<IZkUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const hasIpPort = !!(device?.ipAddress && device?.port);

  const queryKey = `${zkKeys.list_zk_users}_${device!.ipAddress}_${device!.port}`;

  const {
    data: zkData,
    isFetching,
    error,
  } = useQueryShared({
    url: `/v1/zk/users?ip=${device!.ipAddress}&port=${device!.port}`,
    key: queryKey,
    enable: hasIpPort,
  });

  const { deleteUser, isDeleting } = useMutateZkUser();

  const users: IZkUser[] = Array.isArray(zkData) ? zkData : (zkData?.data ?? []);

  const actionButton = [
    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IZkUser) => {
        setDeleteTarget(value);
        setDeleteOpen(true);
      },
    },
  ];

  const { table: subTable } = useDataTableDetail({
    columns: zkUserColumns(actionButton),
    queryData: users,
  });

  const handleDelete = async () => {
    if (!deleteTarget || !device?.ipAddress || !device?.port) return;
    setIsLoading(true);
    await deleteUser(
      {
        request: {
          ip: device.ipAddress,
          port: device.port,
          userId: deleteTarget.userId,
        },
        queryKey: queryKey,
      },
      {
        onSuccess: () => {
          setDeleteOpen(false);
        },
        onSettled: () => {
          setIsLoading(true);
        },
      },
    );
  };

  const rawError = error as any;
  const errorMsg: string = rawError?.message ?? rawError?.error ?? String(error ?? "");
  const isUnreachable =
    errorMsg.includes("503") ||
    errorMsg.toLowerCase().includes("unreachable") ||
    errorMsg.toLowerCase().includes("connect") ||
    errorMsg.toLowerCase().includes("timed out") ||
    errorMsg.toLowerCase().includes("econnrefused");

  // No IP/port configured on this device
  if (!hasIpPort) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
        <Users className="h-8 w-8 opacity-40" />
        <p className="text-sm font-medium">No IP / port configured</p>
        <p className="text-xs">Edit this device to add a network address before querying users.</p>
      </div>
    );
  }

  // Loading
  if (isLoading || isFetching) {
    return (
      <div className="space-y-2 py-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
        <p className="text-xs text-center text-muted-foreground pt-1">Connecting to device, this may take a moment…</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <>
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <ServerCrash className="h-9 w-9 text-red-400" />
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            {isUnreachable ? "Device unreachable" : "Failed to load users"}
          </p>
          <p className="text-xs text-muted-foreground max-w-sm">
            {isUnreachable
              ? "Could not connect to this device. Check that the IP address and port are correct and the device is online."
              : errorMsg || "An unexpected error occurred."}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Isolated PaginationProvider so the outer device-table loading state doesn't bleed in */}
      <p>
        Total Users: <span>{users.length}</span>
      </p>
      <BaseDataTable table={subTable} isPage={false} />

      <SharedDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Remove User from Device"
        width="420px"
        isSubmit
        submitTitle="Yes, Remove"
        className="bg-red-500"
        isLoading={isDeleting}
        submitEvent={handleDelete}
      >
        <p>
          Remove{" "}
          <strong>
            {deleteTarget?.name
              ? `${deleteTarget.name}${deleteTarget.userId ? ` (${deleteTarget.userId})` : ""}`
              : (deleteTarget?.userId ?? "this user")}
          </strong>{" "}
          from <strong>{device?.name}</strong>? Their fingerprint templates stored on this device will be permanently
          deleted.
        </p>
      </SharedDialog>
    </>
  );
}

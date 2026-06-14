"use client";

import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CirclePlus,
  Fingerprint,
  SendHorizonal,
  Trash2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SharedDialog from "@/components/shared/SharedDialog";
import { Section } from "@/components/shared/view/RenderView";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { useMutateFingerPrint } from "@/stores/admin/useMutateFingerPrint";
import { distributeFingerPrint, IDistributeResponse } from "@/service/admin/finger-print.service";
import { fingerPrintKeys } from "@/service/util/query-keys/finger-print";
import { IEmployee } from "@/types/admin/employee";
import { IFingerPrint } from "@/types/admin/finger-print";
import { IDevice } from "@/types/admin/device";
import { toast } from "sonner";

interface Props {
  employee: IEmployee;
}

export default function FingerPrintTab({ employee }: Props) {
  const [enrollOpen, setEnrollOpen] = React.useState(false);
  const [distributeOpen, setDistributeOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [distributeTarget, setDistributeTarget] = React.useState<IFingerPrint | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<IFingerPrint | null>(null);

  // Enroll form
  const [enrollDeviceId, setEnrollDeviceId] = React.useState("");
  const [enrollRole, setEnrollRole] = React.useState("");
  const [enrollPassword, setEnrollPassword] = React.useState("");

  // Distribute state
  const [selectedDeviceIds, setSelectedDeviceIds] = React.useState<number[]>([]);
  const [distributeLoading, setDistributeLoading] = React.useState(false);
  const [distributeResults, setDistributeResults] = React.useState<IDistributeResponse | null>(null);

  const listKey = `${fingerPrintKeys.list_finger_print}_employee_${employee.id}`;

  const { data: fpData, refetch } = useQueryShared({
    url: `/finger-prints/employee/${employee.id}`,
    key: listKey,
    enable: !!employee.id,
  });

  const { data: devicesData } = useQueryShared({
    url: `/v1/devices`,
    key: "list_all_devices_picker",
  });

  const { enroll, remove, isEnrolling, isRemoving } = useMutateFingerPrint(employee.id!);

  const enrollments: IFingerPrint[] = Array.isArray(fpData) ? fpData : (fpData?.data ?? []);
  const allDevices: IDevice[] = Array.isArray(devicesData) ? devicesData : (devicesData?.data ?? []);

  const enrolledDeviceIds = new Set(enrollments.map((e) => e.deviceId));
  const availableForEnroll = allDevices.filter((d) => !enrolledDeviceIds.has(d.id));

  const getDistributableDevices = (sourceDeviceId?: number) =>
    allDevices.filter((d) => d.id !== sourceDeviceId && !enrolledDeviceIds.has(d.id));

  // --- Enroll ---
  const openEnroll = () => {
    setEnrollDeviceId("");
    setEnrollRole("");
    setEnrollPassword("");
    setEnrollOpen(true);
  };

  const handleEnroll = async () => {
    if (!enrollDeviceId) {
      toast.warning("Please select a device");
      return;
    }
    await enroll({
      employeeId: employee.id!,
      deviceId: Number(enrollDeviceId),
      role: enrollRole ? Number(enrollRole) : undefined,
      password: enrollPassword || undefined,
    });
    setEnrollOpen(false);
  };

  // --- Distribute ---
  const openDistribute = (fp: IFingerPrint) => {
    setDistributeTarget(fp);
    setSelectedDeviceIds([]);
    setDistributeResults(null);
    setDistributeOpen(true);
  };

  const handleDistribute = async () => {
    if (!distributeTarget?.id) return;
    if (selectedDeviceIds.length === 0) {
      toast.warning("Select at least one device");
      return;
    }
    setDistributeLoading(true);
    try {
      const res = await distributeFingerPrint(distributeTarget.id, selectedDeviceIds);
      setDistributeResults(res);
      refetch();
    } catch {
      toast.error("Distribution failed");
    } finally {
      setDistributeLoading(false);
    }
  };

  // --- Delete ---
  const openDelete = (fp: IFingerPrint) => {
    setDeleteTarget(fp);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await remove(deleteTarget.id);
    setDeleteOpen(false);
  };

  const distributableDevices = distributeTarget
    ? getDistributableDevices(distributeTarget.deviceId)
    : [];

  return (
    <div className="space-y-6">
      {enrollments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center text-center gap-3 py-10">
            <Fingerprint className="h-10 w-10 text-muted-foreground/50" />
            <div>
              <p className="font-medium">No fingerprint enrolled yet</p>
              <p className="text-sm text-muted-foreground">
                Enroll a device so this employee can clock in/out.
              </p>
            </div>
            <Button size="sm" onClick={openEnroll}>
              <CirclePlus className="size-4 mr-1" /> Enroll Device
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="flex justify-end mb-3">
            <Button size="sm" onClick={openEnroll}>
              <CirclePlus className="size-4 mr-1" /> Enroll Device
            </Button>
          </div>

          <Section icon={<Fingerprint className="h-4 w-4" />} title="Enrolled Devices">
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-10">
                      #
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">
                      Device
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">
                      Location
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-16">
                      Role
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-24">
                      Status
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((fp, idx) => (
                    <tr
                      key={fp.id}
                      className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium">{fp.device?.name ?? "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {fp.device?.location ?? "—"}
                      </td>
                      <td className="px-4 py-3">{fp.role ?? "—"}</td>
                      <td className="px-4 py-3">
                        {fp.isActive ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-transparent">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDistribute(fp)}
                          >
                            <SendHorizonal className="size-3.5 mr-1" /> Distribute
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openDelete(fp)}
                          >
                            <Trash2 className="size-3.5 mr-1" /> Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      )}

      {/* ── Enroll Modal ── */}
      <SharedDialog
        open={enrollOpen}
        setOpen={setEnrollOpen}
        title="Enroll Device"
        width="480px"
        isSubmit
        submitTitle="Enroll"
        isLoading={isEnrolling}
        submitEvent={handleEnroll}
      >
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>
              Device <span className="text-red-500">*</span>
            </Label>
            <Select value={enrollDeviceId} onValueChange={setEnrollDeviceId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a device" />
              </SelectTrigger>
              <SelectContent>
                {availableForEnroll.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    All devices already enrolled
                  </div>
                ) : (
                  availableForEnroll.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.name}
                      {d.location ? ` — ${d.location}` : ""}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>
              Role{" "}
              <span className="text-muted-foreground text-xs font-normal">(optional)</span>
            </Label>
            <Input
              type="number"
              placeholder="e.g. 0"
              value={enrollRole}
              onChange={(e) => setEnrollRole(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>
              Password{" "}
              <span className="text-muted-foreground text-xs font-normal">(optional)</span>
            </Label>
            <Input
              type="text"
              placeholder="Device password"
              value={enrollPassword}
              onChange={(e) => setEnrollPassword(e.target.value)}
            />
          </div>

          {enrollDeviceId && (
            <p className="text-xs text-muted-foreground bg-muted/50 rounded p-3 border leading-relaxed">
              After enrolling, ask the employee to scan their finger on this device. Then use
              "Distribute" to push the fingerprint to other locations.
            </p>
          )}
        </div>
      </SharedDialog>

      {/* ── Distribute Modal ── */}
      <SharedDialog
        open={distributeOpen}
        setOpen={setDistributeOpen}
        title={`Distribute — ${distributeTarget?.device?.name ?? ""}`}
        width="520px"
        isSubmit={!distributeResults}
        submitTitle="Distribute"
        isLoading={distributeLoading}
        submitEvent={handleDistribute}
      >
        {distributeResults ? (
          <div className="space-y-3 py-2">
            {distributeResults.templatesFound === 0 && (
              <div className="flex items-start gap-2 rounded-md border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 p-3 text-sm text-yellow-700 dark:text-yellow-400">
                <AlertTriangle className="size-4 mt-0.5 shrink-0" />
                <span>
                  No fingerprint template found on this device yet. Ask the employee to scan
                  their finger first, then distribute again.
                </span>
              </div>
            )}
            <p className="text-sm font-medium">Distribution results:</p>
            <div className="space-y-2">
              {distributeResults.results.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {r.success ? (
                    <CheckCircle2 className="size-4 text-green-600 shrink-0" />
                  ) : (
                    <XCircle className="size-4 text-red-600 shrink-0" />
                  )}
                  <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                    {r.ip}:{r.port}
                  </span>
                  {!r.success && r.error && (
                    <span className="text-muted-foreground text-xs">— {r.error}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              Select devices to push the fingerprint template from{" "}
              <strong>{distributeTarget?.device?.name}</strong>:
            </p>
            {distributableDevices.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No other devices available to distribute to.
              </p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {distributableDevices.map((d) => (
                  <label
                    key={d.id}
                    className="flex items-center gap-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      checked={selectedDeviceIds.includes(d.id!)}
                      onCheckedChange={(checked) => {
                        setSelectedDeviceIds((prev) =>
                          checked ? [...prev, d.id!] : prev.filter((id) => id !== d.id),
                        );
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium">{d.name}</p>
                      {d.location && (
                        <p className="text-xs text-muted-foreground">{d.location}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </SharedDialog>

      {/* ── Delete Confirmation ── */}
      <SharedDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Remove Enrollment"
        width="400px"
        isSubmit
        submitTitle="Yes, Remove"
        className="bg-red-500"
        isLoading={isRemoving}
        submitEvent={handleDelete}
      >
        <p>
          Remove enrollment for{" "}
          <strong>{deleteTarget?.device?.name ?? "this device"}</strong>? The employee will no
          longer be able to clock in/out from this device.
        </p>
      </SharedDialog>
    </div>
  );
}

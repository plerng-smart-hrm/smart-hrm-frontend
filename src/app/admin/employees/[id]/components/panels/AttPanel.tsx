"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SharedSheet from "@/components/shared/SharedSheet";
import ActionButton from "@/components/shared/button/ActionButton";
import { attAdjustmentSchema, AttAdjustmentValues } from "@/schemas/admin/att-adjustment";
import { useMutateAttAdjustment } from "@/stores/admin/useMutateAttAdjustment";
import { IDailyAttendance } from "@/types/admin/attendance-summary";
import { LeaveTypeCombobox } from "@/components/comboboxes/LeaveTypeCombobox";

export interface AttCellInfo {
  record: IDailyAttendance;
  fieldChanged: string;
  oldValue: string;
}

const FIELD_LABELS: Record<string, string> = {
  F_IN: "First In",
  F_OUT: "First Out",
  S_IN: "Second In",
  S_OUT: "Second Out",
  OT1: "OT x 1.5",
  OT2: "OT x 2",
  LEAVE_HOURS: "Leave Hours",
};

const TIME_FIELDS = ["F_IN", "F_OUT", "S_IN", "S_OUT"];

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  employeeId: number;
  cellInfo: AttCellInfo | null;
  onSuccess?: () => void;
}

export default function AttPanel({ open, setOpen, employeeId, cellInfo, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { createAttAdjustment } = useMutateAttAdjustment();

  const isTimeField = TIME_FIELDS.includes(cellInfo?.fieldChanged ?? "");
  const isLeaveField = cellInfo?.fieldChanged === "LEAVE_HOURS";

  const form = useForm<AttAdjustmentValues>({
    resolver: zodResolver(attAdjustmentSchema),
    defaultValues: {
      employeeId,
      date: "",
      fieldChanged: "",
      oldValue: "",
      newValue: "",
      leaveType: "",
      reason: "",
    },
  });

  useEffect(() => {
    if (open && cellInfo) {
      form.reset({
        employeeId,
        date: cellInfo.record.date,
        fieldChanged: cellInfo.fieldChanged,
        oldValue: cellInfo.oldValue || "",
        newValue: "",
        leaveType: "",
        reason: "",
      });
    }
  }, [open, cellInfo, employeeId]);

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const values = form.getValues();
    setIsLoading(true);

    await createAttAdjustment(
      { request: values },
      {
        onSuccess: () => {
          setOpen(false);
          onSuccess?.();
        },
        onSettled: () => setIsLoading(false),
      },
    );
  };

  const fieldLabel = FIELD_LABELS[cellInfo?.fieldChanged ?? ""] ?? cellInfo?.fieldChanged ?? "";

  return (
    <SharedSheet
      open={open}
      setOpen={setOpen}
      title="Attendance Adjustment"
      desc={cellInfo ? `${cellInfo.record.date} · ${fieldLabel}` : undefined}
      width="30rem"
    >
      <Form {...form}>
        <div className="space-y-4 pb-20">
          <div className="grid grid-cols-3 gap-3 rounded-md border bg-muted/40 px-4 py-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Date</p>
              <p className="font-medium">{cellInfo?.record.date ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Field</p>
              <p className="font-medium">{fieldLabel || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Current</p>
              <p className="font-medium">{cellInfo?.oldValue || "—"}</p>
            </div>
          </div>

          {isLeaveField && (
            <FormField
              control={form.control}
              name="leaveType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Leave Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <LeaveTypeCombobox
                      value={field.value}
                      onChange={(v) => field.onChange(v ?? "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="newValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {isLeaveField ? "Hours" : "New Value"} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type={isTimeField ? "time" : "number"}
                    step={isTimeField ? 60 : isLeaveField ? 0.5 : undefined}
                    min={isLeaveField ? 0 : undefined}
                    placeholder={isLeaveField ? "e.g. 4" : undefined}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Reason {isLeaveField && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder={isLeaveField ? "e.g. Half-day annual leave" : "Optional reason for adjustment…"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ActionButton
          setOpen={setOpen}
          handleSubmit={handleSubmit}
          submitTitle="Submit"
          isLoading={isLoading}
          disable={isLoading}
        />
      </Form>
    </SharedSheet>
  );
}

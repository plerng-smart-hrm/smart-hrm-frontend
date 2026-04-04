"use client";

import { ITriggerAttendanceSummaryResponse } from "@/types/admin/attendance-summary";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, Users, CalendarDays } from "lucide-react";
import { format, parseISO } from "date-fns";
import ActionButton from "@/components/shared/button/ActionButton";

interface Props {
  result?: ITriggerAttendanceSummaryResponse;
  onClose: () => void;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  try {
    return format(parseISO(dateStr), "dd MMM yyyy");
  } catch {
    return dateStr;
  }
};

export default function TriggerAttendanceSummaryResult({ result, onClose }: Props) {
  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="font-semibold">Summary Generated</p>
          <p className="text-sm text-muted-foreground">
            <CalendarDays className="inline h-3.5 w-3.5 mr-1" />
            {formatDate(result?.date)}
          </p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg border p-4 space-y-1">
          <p className="text-2xl font-bold">{result?.total ?? 0}</p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Users className="h-3.5 w-3.5" /> Total
          </p>
        </div>
        <div className="rounded-lg border p-4 space-y-1 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result?.succeeded ?? 0}</p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Succeeded
          </p>
        </div>
        <div className="rounded-lg border p-4 space-y-1 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{result?.failed ?? 0}</p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <XCircle className="h-3.5 w-3.5 text-red-500" /> Failed
          </p>
        </div>
      </div>

      {result?.failedEmployeeIds && result?.failedEmployeeIds.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Failed Employee IDs</p>
            <div className="flex flex-wrap gap-2">
              {result?.failedEmployeeIds.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center rounded-md border border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:text-red-400"
                >
                  ID: {id}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end pt-2">
        <ActionButton setOpen={onClose} submitTitle="Close" handleSubmit={onClose} />
      </div>
    </div>
  );
}

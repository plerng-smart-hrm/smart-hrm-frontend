"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import "react-day-picker/dist/style.css";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import FormLabel from "./FormLabel";
import { get } from "lodash";
import { cn } from "@/lib/utils";

type ISelectMode = "single" | "multiple" | "range";

interface DatePickerProps extends React.PropsWithChildren {
  label?: string;
  onChange?: (date: Date | undefined) => void;
  field?: any;
  required?: boolean;
  readonly?: boolean;
  helper?: string;
  isFormat?: boolean;
  allowedRange?: string;
  selectMode?: ISelectMode;
}

export function InputDate({
  label = "Date",
  field,
  required,
  readonly = false,
  isFormat,
  allowedRange,
  helper,
  selectMode = "single",
  onChange,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>();
  const [open, setOpen] = React.useState(false);

  const getField = field?.field ?? undefined;
  const formState = field?.formState?.errors;
  const fieldName = getField?.name ?? "";
  const fieldError = get(formState, fieldName);
  const hasError = Boolean(fieldError);

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    onChange?.(selected);

    // Example formatting only for single mode
    if (selectMode === "single" && selected instanceof Date) {
      if (isFormat) {
        getField?.onChange(format(selected, "yyyy-MM-dd"));
      } else {
        getField?.onChange(selected);
      }
      setOpen(false);
    }

    const from = (selected as any)?.from ?? "";
    const to = (selected as any)?.to ?? "";
    if (selectMode === "range" && selected && from && to) {
      getField?.onChange(selected);
    }

    if (selectMode === "multiple") {
      getField?.onChange(selected);
    }
  };

  const dayMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const handleSelectRange = () => {
    if (!allowedRange) {
      return { startDay: undefined, endDay: undefined };
    }

    const [start, end] = allowedRange.split(" - ");

    return {
      startDay: dayMap[start],
      endDay: dayMap[end],
    };
  };

  React.useEffect(() => {
    if (getField?.value) {
      setDate(getField.value);
    }
  }, [getField?.value]);

  return (
    <div className="flex flex-col gap-0">
      <FormLabel label={label} required={required} helper={helper} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="mt-[8px]">
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between h-10 text-left font-normal text-[11px] border",
              hasError ? "border-destructive ring-destructive/20 ring-1" : "border-input"
            )}
            id="date"
          >
            {selectMode === "single" && date instanceof Date ? (
              format(date, "dd-MM-yyyy")
            ) : selectMode === "range" && date && (date as any).from ? (
              `${format((date as any).from, "dd-MM-yyyy")} - ${
                (date as any).to ? format((date as any).to, "dd-MM-yyyy") : "..."
              }`
            ) : (
              <span className="text-muted-foreground">Select date</span>
            )}
            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        {!readonly && (
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode={selectMode as any}
              selected={date}
              onSelect={handleSelect}
              captionLayout="dropdown"
              className="w-full"
              toYear={2100}
              disabled={day => {
                const dow = day.getDay(); // 0 = Sunday, 6 = Saturday
                const { startDay, endDay } = handleSelectRange();

                if (startDay === undefined || endDay === undefined) {
                  return false; // allow all days
                }

                // Normal range (e.g. Monday - Thursday)
                if (startDay <= endDay) {
                  return dow < startDay || dow > endDay;
                }

                // Wrapped range (e.g. Friday - Sunday)
                return !(dow >= startDay || dow <= endDay);
              }}
              classNames={{
                table: "w-full border-collapse",
                head_row: "",
                head_cell: "text-center text-xs font-medium text-muted-foreground w-9",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-1 w-9 h-9",
                day: "",
                dropdown:
                  "border border-input rounded-md bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                caption_label: "hidden",
              }}
            />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}

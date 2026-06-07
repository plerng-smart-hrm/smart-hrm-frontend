"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ITimeShiftOption } from "@/types/admin/time-shift";
import { timeShiftKeys } from "@/service/util/query-keys/time-shift";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";

interface Props {
  value?: number;
  onChange: (value: number | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function formatShiftRange(fIn?: string, fOut?: string | null, sIn?: string | null, sOut?: string): string {
  const isSplit = fOut && sIn;
  if (isSplit) {
    return `${fIn}–${fOut}, ${sIn}–${sOut}`;
  }
  return `${fIn}–${sOut}`;
}

export function TimeShiftCombobox({ value, onChange, disabled = false, placeholder = "Select time shift..." }: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data, isLoading } = useQueryShared({
    url: "/v1/time-shifts/options",
    key: timeShiftKeys.option_time_shift,
  });

  console.log("data", data);
  const timeShifts: ITimeShiftOption[] = React.useMemo(() => (data?.data as ITimeShiftOption[]) ?? [], [data?.data]);

  const selectedTimeShift = React.useMemo(() => timeShifts.find((shift) => shift.value === value), [timeShifts, value]);

  // Filter on both label and the formatted time range
  const filteredTimeShifts = React.useMemo(() => {
    if (!searchQuery) return timeShifts;

    const query = searchQuery.toLowerCase();
    return timeShifts.filter(
      (shift) => shift.label?.toLowerCase().includes(query) || formatShiftRange(shift).toLowerCase().includes(query),
    );
  }, [timeShifts, searchQuery]);

  const handleSelect = (shiftValue: string) => {
    const shift = timeShifts.find((s) => s.value.toString() === shiftValue);
    if (shift) {
      const newValue = shift.value === value ? undefined : shift.value;
      onChange(newValue);
      setOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          disabled={disabled || isLoading}
          className="w-full justify-between font-normal min-h-10 h-auto py-2"
        >
          <span className="truncate text-left flex-1">
            {isLoading ? (
              <span className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </span>
            ) : selectedTimeShift ? (
              <span className="flex flex-col">
                <span className="font-medium">{selectedTimeShift.label}</span>
                <span className="text-xs text-muted-foreground">{formatShiftRange(selectedTimeShift)}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[--radix-popover-trigger-width]"
        align="start"
        onWheel={(e) => e.stopPropagation()}
      >
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search time shift..." value={searchQuery} onValueChange={setSearchQuery} />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No time shift found</CommandEmpty>
            <CommandGroup>
              {filteredTimeShifts.map((shift: ITimeShiftOption) => (
                <CommandItem
                  key={shift?.value}
                  value={shift?.value?.toString()}
                  onSelect={() => handleSelect(shift?.value?.toString())}
                >
                  <Check className={cn("mr-2 h-4 w-4 shrink-0", value === shift.value ? "opacity-100" : "opacity-0")} />
                  <span className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{shift.label}</span>
                    <span className="text-xs text-muted-foreground truncate">{formatShiftRange(shift)}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

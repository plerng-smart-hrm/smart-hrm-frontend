"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getWorkingShiftsList } from "@/service/admin/working-shifts.service";
import { queryKeys } from "@/service/util/query-keys/working-shift";
import { IWorkingShiftOption } from "@/types/admin/working-shift";

interface Props {
  value?: number;
  onChange: (value: number | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function WorkingShiftCombobox({
  value,
  onChange,
  disabled = false,
  placeholder = "Select working shift...",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.workingShifts.dropdown(),
    queryFn: () => getWorkingShiftsList(),
  });

  const workingShifts: IWorkingShiftOption[] = React.useMemo(
    () => data?.data ?? [],
    [data?.data]
  );

  // Find the selected working shift
  const selectedWorkingShift = React.useMemo(
    () => workingShifts.find((shift) => shift.value === value),
    [workingShifts, value]
  );

  // Filter working shifts based on search query
  const filteredWorkingShifts = React.useMemo(() => {
    if (!searchQuery) return workingShifts;

    const query = searchQuery.toLowerCase();
    return workingShifts.filter((shift) =>
      shift.label?.toLowerCase().includes(query)
    );
  }, [workingShifts, searchQuery]);

  // Handle selection
  const handleSelect = (shiftValue: string) => {
    const shift = workingShifts.find((s) => s.value.toString() === shiftValue);
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
          role="combobox"
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
            ) : selectedWorkingShift ? (
              selectedWorkingShift.label
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
          <CommandInput
            placeholder="Search working shift..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No working shift found</CommandEmpty>
            <CommandGroup>
              {filteredWorkingShifts.map((shift) => (
                <CommandItem
                  key={shift.value}
                  value={shift.value.toString()}
                  onSelect={() => handleSelect(shift.value.toString())}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === shift.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="font-medium truncate">{shift.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { leaveTypeKeys } from "@/service/util/query-keys/leave-type";

interface LeaveTypeOption {
  value: string;
  label: string;
  nameKh: string;
}

interface Props {
  value?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function LeaveTypeCombobox({
  value,
  onChange,
  disabled = false,
  placeholder = "Select leave type...",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: leaveTypesData, isLoading } = useQueryShared({
    url: `/v1/leave-types/options`,
    key: leaveTypeKeys.list_leave_type,
    enable: open,
  });

  const leaveTypes = React.useMemo<LeaveTypeOption[]>(
    () => (leaveTypesData?.data as LeaveTypeOption[]) ?? [],
    [leaveTypesData?.data],
  );

  const selectedLeaveType = React.useMemo(
    () => leaveTypes.find((s) => s.value === value),
    [leaveTypes, value],
  );

  const filteredLeaveTypes = React.useMemo(() => {
    if (!searchQuery) return leaveTypes;
    const query = searchQuery.toLowerCase();
    return leaveTypes.filter(
      (s) => s.label?.toLowerCase().includes(query) || s.nameKh?.includes(query),
    );
  }, [leaveTypes, searchQuery]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setSearchQuery("");
  };

  const handleSelect = (leaveType: LeaveTypeOption) => {
    onChange(leaveType.value === value ? undefined : leaveType.value);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between font-normal min-h-10 h-auto py-2"
        >
          <span className="truncate text-left flex-1">
            {selectedLeaveType ? (
              selectedLeaveType.label
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
          <CommandInput placeholder="Search leave type..." value={searchQuery} onValueChange={setSearchQuery} />
          <CommandList className="max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : filteredLeaveTypes.length === 0 ? (
              <CommandEmpty>No leave type found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredLeaveTypes.map((leaveType) => (
                  <CommandItem
                    key={leaveType.value}
                    value={leaveType.value}
                    onSelect={() => handleSelect(leaveType)}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", value === leaveType.value ? "opacity-100" : "opacity-0")}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium truncate">{leaveType.label}</span>
                      <span className="text-xs text-muted-foreground truncate">{leaveType.nameKh}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

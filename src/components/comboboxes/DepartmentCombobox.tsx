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
import { getDepartmentsList } from "@/service/admin/departments.service";
import { queryKeys } from "@/service/util/query-keys/department";
import { IDepartmentOption } from "@/types/admin/department";

interface Props {
  value?: number;
  onChange: (value: number | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function DepartmentCombobox({
  value,
  onChange,
  disabled = false,
  placeholder = "Select department...",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.departments.dropdown(),
    queryFn: () => getDepartmentsList(),
  });

  const departments: IDepartmentOption[] = React.useMemo(
    () => data?.data ?? [],
    [data?.data]
  );

  // Find the selected department
  const selectedDepartment = React.useMemo(
    () => departments.find((department) => department.value === value),
    [departments, value]
  );

  // Filter departments based on search query
  const filteredDepartments = React.useMemo(() => {
    if (!searchQuery) return departments;

    const query = searchQuery.toLowerCase();
    return departments.filter((department) =>
      department.label?.toLowerCase().includes(query)
    );
  }, [departments, searchQuery]);

  // Handle selection
  const handleSelect = (departmentValue: string) => {
    const department = departments.find(
      (d) => d.value.toString() === departmentValue
    );
    if (department) {
      const newValue =
        department.value === value ? undefined : department.value;
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
            ) : selectedDepartment ? (
              selectedDepartment.label
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
            placeholder="Search department..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No department found</CommandEmpty>
            <CommandGroup>
              {filteredDepartments.map((department) => (
                <CommandItem
                  key={department.value}
                  value={department.value.toString()}
                  onSelect={() => handleSelect(department.value.toString())}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === department.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="font-medium truncate">
                    {department.label}
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

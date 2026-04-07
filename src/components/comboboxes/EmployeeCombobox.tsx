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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getAllEmployees } from "@/service/admin/employees.service";
import { IEmployee } from "@/types/admin/employee";
import { employeeKeys } from "@/service/util/query-keys/employee";
import { FormItem } from "@/components/ui/form";
import FormLabel from "@/components/shared/form/FormLabel";

interface Props {
  value?: number;
  onChange: (employee: IEmployee | undefined) => void;
  disabled?: boolean;
}

export function EmployeeCombobox({ value, onChange, disabled = false }: Props) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: [employeeKeys.list_employee],
    queryFn: () => getAllEmployees(0, 500),
  });

  const employees: IEmployee[] = data?.employees ?? [];

  const selected = employees.find((e) => e.id === value);

  const filtered = React.useMemo(() => {
    if (!search) return employees;
    const q = search.toLowerCase();
    return employees.filter(
      (e) =>
        e.firstName?.toLowerCase().includes(q) ||
        e.lastName?.toLowerCase().includes(q) ||
        e.empCode?.toLowerCase().includes(q),
    );
  }, [employees, search]);

  return (
    <FormItem className="grid gap-y-2 w-full">
      <FormLabel label="និយោជិត (Employee)" required helper="ជ្រើសរើសនិយោជិតដែលត្រូវបញ្ចប់ការងារ" />
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled || isLoading}
            className="w-full justify-between font-normal min-h-10 h-auto py-2"
          >
            <span className="truncate text-left flex-1">
              {isLoading ? (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : selected ? (
                <span>
                  {selected.lastName} {selected.firstName}
                  {selected.empCode && (
                    <span className="ml-2 text-muted-foreground text-xs">#{selected.empCode}</span>
                  )}
                </span>
              ) : (
                <span className="text-muted-foreground">ជ្រើសរើសនិយោជិត...</span>
              )}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start" onWheel={(e) => e.stopPropagation()}>
          <Command shouldFilter={false}>
            <CommandInput placeholder="ស្វែងរកតាមឈ្មោះ ឬ Code..." value={search} onValueChange={setSearch} />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>រកមិនឃើញនិយោជិត</CommandEmpty>
              <CommandGroup>
                {filtered.map((emp) => (
                  <CommandItem
                    key={emp.id}
                    value={String(emp.id)}
                    onSelect={() => {
                      onChange(emp.id === value ? undefined : emp);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === emp.id ? "opacity-100" : "opacity-0")} />
                    <span className="font-medium">
                      {emp.lastName} {emp.firstName}
                    </span>
                    {emp.empCode && (
                      <span className="ml-2 text-muted-foreground text-xs">#{emp.empCode}</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormItem>
  );
}

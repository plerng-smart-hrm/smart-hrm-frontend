"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { sectionKeys } from "@/service/util/query-keys/section";

interface SectionOption {
  value: number;
  label: string;
}

interface Props {
  value?: number;
  onChange: (value: number | undefined) => void;
  departmentId?: number;
  disabled?: boolean;
  placeholder?: string;
}

export function SectionCombobox({
  value,
  onChange,
  departmentId,
  disabled = false,
  placeholder = "Select section...",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loadMoreEl, setLoadMoreEl] = React.useState<HTMLDivElement | null>(null);

  const { data: sectionsData, isLoading } = useQueryShared({
    url: `/v1/sections/department/${departmentId}`,
    key: `${sectionKeys.list_section}_department_${departmentId}`,
    enable: open && !!departmentId,
  });

  const sections = React.useMemo<SectionOption[]>(
    () => (sectionsData?.data as SectionOption[]) ?? [],
    [sectionsData?.data],
  );

  const selectedSection = React.useMemo(() => sections.find((s) => s.value === value), [sections, value]);

  const filteredSections = React.useMemo(() => {
    if (!searchQuery) return sections;
    const query = searchQuery.toLowerCase();
    return sections.filter((s) => s.label?.toLowerCase().includes(query));
  }, [sections, searchQuery]);

  React.useEffect(() => {
    if (!loadMoreEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          // extend here when backend supports pagination
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(loadMoreEl);
    return () => observer.disconnect();
  }, [loadMoreEl, isLoading]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setSearchQuery("");
  };

  const handleSelect = (section: SectionOption) => {
    onChange(section.value === value ? undefined : section.value);
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
          disabled={disabled || !departmentId}
          className="w-full justify-between font-normal min-h-10 h-auto py-2"
        >
          <span className="truncate text-left flex-1">
            {selectedSection ? (
              selectedSection.label
            ) : (
              <span className="text-muted-foreground">{!departmentId ? "Select department first" : placeholder}</span>
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
          <CommandInput placeholder="Search section..." value={searchQuery} onValueChange={setSearchQuery} />
          <CommandList className="max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : filteredSections.length === 0 ? (
              <CommandEmpty>No section found</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredSections.map((section) => (
                  <CommandItem
                    key={section.value}
                    value={section.value.toString()}
                    onSelect={() => handleSelect(section)}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === section.value ? "opacity-100" : "opacity-0")} />
                    <span className="font-medium truncate">{section.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            <div ref={setLoadMoreEl} className="px-4 py-1">
              {isLoading && sections.length > 0 && (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

import React, { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ISelectOption } from "@/types/helperType";
import { permissionColors } from "@/types/helper";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import FormLabel from "./FormLabel";
import { get } from "lodash";

interface MultiSelectProps {
    value?: string[];
    handleEvent?: (values: string[]) => void;
    field?: any;
    options?: ISelectOption[] | [];
    label?: string;
    required?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    helper?: string;
    dataType?: string;
}

export default function MultiSelect({
    value = [],
    handleEvent,
    field,
    label,
    required,
    options = [],
    disabled = false,
    helper,
    dataType,
    isLoading = false,
}: MultiSelectProps) {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<any[]>([]);

    const getField = field?.field ?? undefined;
    const formState = field?.formState?.errors;
    const fieldName = getField?.name ?? "";
    const fieldError = get(formState, fieldName);
    const hasError = Boolean(fieldError);

    useEffect(() => {
        if (value?.length) {
            const formatValue = value.map(item => {
                if (dataType === "string") {
                    return String(item);
                } else if (dataType === "number") {
                    return Number(item);
                }
            });
            setSelectedValues(formatValue);
        }
    }, [dataType, value]);

    const toggleValue = (val: string) => {
        let newValues: string[];
        if (selectedValues.includes(val)) {
            newValues = selectedValues.filter(v => v !== val);
        } else {
            newValues = [...selectedValues, val];
        }
        setSelectedValues(newValues);
        handleEvent?.(newValues);
        getField?.onChange?.(newValues);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="gap-0">
                <div>
                    <FormLabel
                        label={label}
                        required={required}
                        helper={helper}
                    />
                    <Button
                        variant="outline"
                        disabled={disabled || isLoading}
                        className={cn(
                            "w-full h-auto min-h-[2.5rem] justify-between mt-[9px]",
                            hasError
                                ? "border-destructive ring-destructive/20 ring-1"
                                : "border-input",
                        )}
                    >
                        <div className="flex flex-wrap gap-1 text-[11px]">
                            {selectedValues.length > 0 ? (
                                options
                                    .filter(o =>
                                        selectedValues.includes(
                                            Number(o.value),
                                        ),
                                    )
                                    .map(option => {
                                        const color =
                                            permissionColors?.[
                                                String(option?.value) ?? ""
                                            ] ?? "bg-blue-500";
                                        return (
                                            <div key={option.value}>
                                                <Badge
                                                    variant="default"
                                                    className={`capitalize ${color}`}
                                                >
                                                    {option.label.toLowerCase()}
                                                </Badge>
                                            </div>
                                        );
                                    })
                            ) : (
                                <span className="text-muted-foreground">
                                    Select options
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                            {isLoading && (
                                <Spinner
                                    size="small"
                                    className="text-red-600 absolute -top-1"
                                />
                            )}
                        </div>
                    </Button>
                </div>
            </PopoverTrigger>
            {!disabled && (
                <PopoverContent className="p-0" side="bottom" align="start">
                    <Command>
                        <CommandInput placeholder="Search..." />
                        <CommandList>
                            {options.map(option => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => toggleValue(option.value)}
                                    className="cursor-pointer"
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary cursor-pointer ",
                                            selectedValues.includes(
                                                option.value,
                                            ) &&
                                                "bg-primary text-primary-foreground",
                                        )}
                                    >
                                        {selectedValues.includes(
                                            option.value,
                                        ) && (
                                            <Check className="h-4 w-4 text-white" />
                                        )}
                                    </div>
                                    <span className="capitalize text-[11px]">
                                        {option.label?.toLowerCase()}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            )}
        </Popover>
    );
}

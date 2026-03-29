import { Input } from "@/components/ui/input";
import { FormItem, FormField } from "@/components/ui/form";
import { FormLabel as Label } from "@/components/ui/form";
import MessageHelper from "./MessageHelper";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { CalendarIcon, CloudUpload } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { get } from "lodash";
import MultiSelect from "./MultiSelect";
import { PhoneInput } from "./PhoneInput";
import { Textarea } from "@/components/ui/textarea";
import TextEditor from "./TextEditor";
import React, { SetStateAction } from "react";

interface IProps {
  form: any;
}

interface IPropsLabel {
  label?: string;
  required?: boolean;
  helper?: string;
  className?: string;
}
interface SanitizeParams {
  form: any;
  field: any;
  isOpen?: React.Dispatch<SetStateAction<boolean>>;
}

export const sanitizedProps = ({ form, field }: SanitizeParams) => {
  return {
    placeholder: form?.label ?? "",
    name: field?.name,
    disabled: form?.disable ?? false,
    readOnly: form?.readonly ?? false,
    autoComplete: "off",
  };
};

export const sanitizeSelectProps = ({ form, field }: SanitizeParams) => ({
  disabled: form?.disable ?? false,
  value: field?.value ?? "",
  onValueChange: (value: any) => {
    field?.onChange?.(value);
    const findOption = form?.options?.length
      ? form.options.find(
          (item: { value: any }) => String(item.value ?? "") === String(value),
        )
      : {};
    form?.handleEvent?.(findOption);
  },
  toYear: 2100,
});

export const sanitizeDateProps = ({ form, field, isOpen }: SanitizeParams) => {
  let selectedDate: Date | undefined = undefined;

  if (field?.value) {
    if (field.value instanceof Date) {
      selectedDate = field.value;
    } else if (typeof field.value === "string") {
      let parsed = new Date(field.value);
      if (!isNaN(parsed.getTime())) {
        selectedDate = parsed;
      } else {
        parsed = parse(field.value, "dd-MM-yyyy", new Date());
        if (!isNaN(parsed.getTime())) selectedDate = parsed;
      }
    }
  }

  return {
    selected: selectedDate,
    initialFocus: true,
    mode: "single" as any,
    captionLayout: "dropdown" as any,
    onSelect: (date: Date | undefined) => {
      const formatted = date ? format(date, "yyyy-MM-dd") : "";
      field?.onChange?.(formatted);
      selectedDate = date;
      form?.handleEvent?.(formatted);
      isOpen?.(false);
    },
    toYear: 2100,
    disabled: (form?.disable || form?.readonly) ?? false,
    classNames: {
      table: "w-full border-collapse",
      head_row: "",
      head_cell: "text-center text-xs font-medium text-muted-foreground w-9",
      row: "flex w-full mt-2",
      cell: "text-center text-sm p-1 w-9 h-9",
      day: "",
      dropdown:
        "border border-input rounded-md bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
      caption_label: "hidden",
    },
  };
};

export const sanitizeMultiSelectProps = ({ form, field }: SanitizeParams) => {
  return {
    value: field?.value ?? "",
    options: form?.options ?? [],
    label: form?.label ?? "",
    required: form?.required ?? "",
    disabled: form?.disabled ?? "",
    helper: form?.helper ?? "",
    dataType: form?.dataType ?? "",
    handleEvent: (value?: any) => {
      form?.handleEvent?.(value);
    },
    field,
    isLoading: form?.isLoading ?? false,
  };
};

export const sanitizePhoneProps = ({ form, field }: SanitizeParams) => {
  return {
    label: form?.label ?? "",
    required: form?.required ?? "",
    disabled: form?.disabled ?? "",
    helper: form?.helper ?? "",
    onChange: (value?: any) => form?.handleEvent?.(value),
    field,
  };
};

export const sanitizeTextEditorProps = ({ form, field }: SanitizeParams) => {
  return {
    label: form?.label ?? "",
    required: form?.required ?? "",
    disabled: form?.disabled ?? "",
    helper: form?.helper ?? "",
    onChange: (value?: any) => form?.handleEvent?.(value),
    field,
  };
};

const FormLabel = ({
  label,
  required,
  helper,
  className = "",
}: IPropsLabel) => {
  return (
    <div className={className}>
      <Label className="relative flex text-[13px]">
        <span className="text-gray-700 dark:text-white"> {label}</span>
        {required && <span className="text-red-600 text-[11px] pl-0.5">*</span>}
        {helper && (
          <div className="flex pl-1 text-primary -mt-1 text-[11px]">
            <MessageHelper helper={helper} />
          </div>
        )}
      </Label>
    </div>
  );
};

const RenderField = ({ form }: IProps) => {
  const field = form?.field?.field as {
    name: string;
    value: string;
    onBlur: () => void;
    onChange: (_value: any) => void;
  };

  const formState = form?.field?.formState?.errors;
  const fieldError = get(formState, field?.name);
  const hasError = Boolean(fieldError);
  const defaultType = form?.type ?? "text";
  const [isDate, setIsDate] = React.useState<boolean>(false);

  if (defaultType === "date") {
    return (
      <FormItem className="grid gap-y-2 w-full">
        <FormLabel
          label={form?.label}
          required={form?.required}
          helper={form?.helper}
        />
        <Popover open={isDate} onOpenChange={setIsDate}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between h-10 text-left font-normal text-[11px] border pl-[30px]",
                hasError
                  ? "border-destructive ring-destructive/20 ring-1"
                  : "border-input",
              )}
              id="date"
            >
              <CalendarIcon className="w-4 h-4 mr-2 absolute left-[10px]" />
              {field?.value ? (
                format(field.value, "dd-MM-yyyy")
              ) : (
                <span className="text-gray-400">{form?.label}</span>
              )}
            </Button>
          </PopoverTrigger>
          {!form?.readonly && (
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                className="w-full"
                {...sanitizeDateProps({ form, field, isOpen: setIsDate })}
              />
            </PopoverContent>
          )}
        </Popover>
      </FormItem>
    );
  }

  if (defaultType === "select") {
    return (
      <FormItem className="grid gap-y-2 w-full">
        <FormLabel
          label={form?.label}
          required={form?.required}
          helper={form?.helper}
        />
        <Select {...sanitizeSelectProps({ form, field })}>
          <SelectTrigger
            className="w-full label_text"
            aria-invalid={!!hasError}
          >
            <SelectValue placeholder={`${form.label}`} />
            {form.isLoading && (
              <div className="absolute right-2">
                <Spinner size="small" />
              </div>
            )}
          </SelectTrigger>

          <SelectContent>
            {form.options?.length ? (
              form.options.map((item: any, idx: number) => (
                <SelectItem key={idx} value={String(item.value)}>
                  {item.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="__empty" disabled>
                Empty value
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </FormItem>
    );
  }

  if (defaultType === "multiSelect") {
    return (
      <MultiSelect
        {...sanitizeMultiSelectProps({ form, field: form?.field })}
      />
    );
  }

  if (defaultType === "phone") {
    return <PhoneInput {...sanitizePhoneProps({ form, field: form?.field })} />;
  }

  if (defaultType === "text") {
    return (
      <FormItem className="grid gap-y-2 w-full">
        <FormLabel
          label={form?.label}
          required={form?.required}
          helper={form?.helper}
        />
        <Input
          {...sanitizedProps({ form, field })}
          value={field?.value ?? ""}
          onChange={(e: any) => {
            const value = e.target.value;

            form?.handleEvent?.(value);
            field?.onChange?.(value);
          }}
          type="text"
          className="text-gray-800"
          error={hasError}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              form?.handleEnterEvent?.(field?.value ?? "");
            }
          }}
        />
      </FormItem>
    );
  }

  if (defaultType === "number") {
    // Convert field value to string for display
    const displayValue =
      field?.value !== undefined && field?.value !== null
        ? String(field.value)
        : "";

    return (
      <FormItem className="grid gap-y-2 w-full">
        <FormLabel
          label={form?.label}
          required={form?.required}
          helper={form?.helper}
        />
        <Input
          {...sanitizedProps({ form, field })}
          onChange={(e: any) => {
            let value = e.target.value;

            if (value === "") {
              const numValue = 0;
              field?.onChange?.(numValue);
              form?.handleEvent?.(numValue);
              return;
            }

            value = value.replace(/[^0-9.]/g, "");

            const parts = value.split(".");
            if (parts.length > 2) {
              value = parts[0] + "." + parts.slice(1).join("");
            }

            if (parts[1]) {
              parts[1] = parts[1].substring(0, 2);
              value = parts[0] + "." + parts[1];
            }

            // Convert to number before passing to onChange
            const numValue = value === "" ? 0 : Number(value);
            field?.onChange?.(isNaN(numValue) ? 0 : numValue);
            form?.handleEvent?.(isNaN(numValue) ? 0 : numValue);
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          value={displayValue}
          className="text-gray-800"
          error={hasError}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            const allowedKeys = [
              "Backspace",
              "Delete",
              "Tab",
              "ArrowLeft",
              "ArrowRight",
              "Enter",
            ];

            if (allowedKeys.includes(e.key)) return;

            // Allow only digits or dot
            if (!/^[0-9.]$/.test(e.key)) {
              e.preventDefault();
              return;
            }

            // Prevent second dot
            if (e.key === "." && displayValue.includes(".")) {
              e.preventDefault();
              return;
            }

            // Enter event
            if (e.key === "Enter") {
              e.preventDefault();
              form?.handleEnterEvent?.(field?.value ?? 0);
            }
          }}
          // BLOCK pasting invalid decimal formats
          onPaste={(e: React.ClipboardEvent) => {
            const text = e.clipboardData.getData("text");

            // Allow: 123 or 123.45
            if (!/^[0-9]*\.?[0-9]{0,2}$/.test(text)) {
              e.preventDefault();
            }
          }}
        />
      </FormItem>
    );
  }

  if (defaultType === "textarea") {
    return (
      <FormItem className="grid gap-y-2 w-full">
        <FormLabel
          label={form?.label}
          required={form?.required}
          helper={form?.helper}
        />
        <Textarea
          {...sanitizedProps({ form, field })}
          value={field?.value ?? ""}
          onChange={(e: any) => {
            const value = e.target.value;
            form?.handleEvent?.(value);
            field?.onChange?.(value);
          }}
          className="text-gray-800"
          aria-invalid={!!hasError}
          rows={form?.row ?? 3}
        />
      </FormItem>
    );
  }

  if (defaultType === "textEditor") {
    return (
      <TextEditor
        {...sanitizeTextEditorProps({ form, field })}
        label={form?.label ?? ""}
      />
    );
  }

  if (defaultType === "time") {
    return (
      <FormItem className="grid gap-y-2 w-full">
        <FormLabel
          label={form?.label}
          required={form?.required}
          helper={form?.helper}
        />
        <Input
          {...sanitizedProps({ form, field })}
          value={field?.value ?? ""}
          onChange={(e: any) => {
            const value = e.target.value;
            form?.handleEvent?.(value);
            field?.onChange?.(value);
          }}
          type="time"
          step="300"
          className="text-gray-800"
          error={hasError}
        />
      </FormItem>
    );
  }

  if (defaultType === "file") {
    return (
      <FormItem className="grid gap-y-2 w-full">
        <FormLabel
          label={form?.label}
          required={form?.required}
          helper={form?.helper}
        />
        <div className="relative">
          <Input
            id={`file-upload-${form?.label}`}
            {...sanitizedProps({ form, field })}
            onChange={(e: any) => {
              const value = e.target.files?.[0] ?? null;
              form?.handleEvent?.(value);
              field?.onChange?.(value);
            }}
            className="text-gray-800 cursor-pointer"
            type="file"
            error={hasError}
          />
          <div className="absolute top-[8px] right-2">
            <label htmlFor={`file-upload-${form?.label}`}>
              <CloudUpload className="text-green-500" />
            </label>
          </div>
        </div>
      </FormItem>
    );
  }

  return null;
};

// Field definition interface for reusable field configurations
export interface FieldDefinition {
  label: string;
  key: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  disable?: boolean;
  readonly?: boolean;
  helper?: string;
  options?: { label: string; value: string | number }[];
  isLoading?: boolean;
  handleEvent?: (value: any) => void;
  handleEnterEvent?: (value: any) => void;
  row?: number;
  dataType?: string;
}

// Props for RenderFields component
interface RenderFieldsProps<T extends FieldValues> {
  fields: FieldDefinition[];
  control: Control<T>;
}

// Reusable component to render multiple form fields
export function RenderFields<T extends FieldValues>({
  fields,
  control,
}: RenderFieldsProps<T>) {
  return (
    <>
      {fields.map((item, index) => (
        <FormField
          key={index}
          control={control}
          name={item.key as Path<T>}
          render={(field) => <RenderField form={{ ...item, field }} />}
        />
      ))}
    </>
  );
}

export default RenderField;

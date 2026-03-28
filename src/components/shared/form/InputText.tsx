import React from "react";
import { CloudUpload, FileCheck2 } from "lucide-react";
import { FormControl, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import FormLabel from "./FormLabel";
import { ControllerFieldState, ControllerRenderProps, UseFormStateReturn } from "react-hook-form";
import { get } from "lodash";

interface IProps {
  label?: string;
  type?: string;
  field?: {
    field: ControllerRenderProps<any>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<any>;
  };
  required?: boolean;
  handleEvent?: (_value?: any) => void;
  handleEnterEvent?: (_value?: any) => void;
  disable?: boolean;
  dataType?: string;
  rows?: number;
  icon?: any;
  helper?: string;
  readonly?: boolean;
  isRequiredLabel?: boolean;
  min?: number;
  max?: number;
  step?: number;
}
const InputText = ({
  label,
  type = "text",
  field,
  handleEvent,
  handleEnterEvent,
  disable,
  dataType = "string",
  rows = 0,
  icon,
  required,
  helper,
  readonly = false,
  isRequiredLabel = true,
  min,
  max,
  step,
}: IProps) => {
  const getField = field?.field ?? undefined;
  const formState = field?.formState?.errors;
  const fieldName = getField?.name ?? "";
  const fieldError = get(formState, fieldName);
  const hasError = Boolean(fieldError);
  const [localValue, setLocalValue] = React.useState<any>("");

  const Icon = () => {
    let defaultIcon = icon;

    if (!icon && type === "file") {
      defaultIcon = CloudUpload;
    }

    const IconComponent =
      type === "file" && getField?.value && getField?.value !== "undefined"
        ? FileCheck2
        : defaultIcon;

    if (!IconComponent) return null;

    return (
      <IconComponent
        className={`absolute right-2 top-[7px] cursor-pointer ${getField?.value ? "text-green-600" : ""}`}
      />
    );
  };

  const parseValue = (value: string): any => {
    if (dataType === "number") {
      return value === "" ? undefined : Number(value);
    }
    return value;
  };

  return (
    <FormItem className="grid gap-y-2 w-full">
      {isRequiredLabel ? (
        <FormLabel label={label} required={required} helper={helper} />
      ) : null}
      <FormControl>
        {rows > 0 ? (
          <Textarea
            rows={rows}
            placeholder={`${label?.toLowerCase()}`}
            onChange={e => {
              const parsedValue = parseValue(e.target.value);
              getField?.onChange(parsedValue);
              handleEvent?.(parsedValue);
            }}
            value={getField?.value ?? ""}
            disabled={disable}
            readOnly={readonly}
            autoComplete="off"
            className="text-[11px] mt-[2px]"
            aria-invalid={!!hasError}
          />
        ) : (
          <div className="relative">
            <Input
              {...(type === "number" ? { min, max, step } : {})}
              id={type === "file" ? `file-upload-${label}` : ""}
              placeholder={`${label}`}
              type={dataType === "number" ? "number" : type}
              onChange={e => {
                const parsedValue =
                  type === "file" ? (e.target.files?.[0] ?? "") : parseValue(e.target.value);

                if (getField) {
                  getField.onChange(parsedValue);
                } else {
                  setLocalValue(parsedValue);
                }

                handleEvent?.(parsedValue);
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleEnterEvent?.(getField ? getField.value : localValue);
                }
              }}
              value={getField ? (getField.value ?? "") : localValue}
              name={getField?.name}
              disabled={disable}
              readOnly={readonly}
              autoComplete="off"
              error={hasError}
              className="text-gray-800 "
            />
            <label htmlFor={`file-upload-${label}`}>
              <Icon />
            </label>
          </div>
        )}
      </FormControl>
    </FormItem>
  );
};

export default InputText;

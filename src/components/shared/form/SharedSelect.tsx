import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerFieldState, ControllerRenderProps, UseFormStateReturn } from "react-hook-form";
import { ISelectOption } from "@/types/helperType";
import { FormItem } from "@/components/ui/form";
import FormLabel from "./FormLabel";
import { get } from "lodash";
import { Spinner } from "@/components/ui/spinner";

interface IProps extends React.PropsWithChildren {
  options?: ISelectOption[];
  label?: string;
  event?: (_value: any) => void;
  field?: {
    field: ControllerRenderProps<any>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<any>;
  };
  required?: boolean;
  dataType?: string;
  helper?: string;
  disable?: boolean;
  isLoading?: boolean;
}

export function SharedSelect({
  options = [],
  label = "",
  event,
  field,
  required,
  dataType = "string",
  disable = false,
  isLoading = false,
  helper,
}: IProps) {
  const getField = field?.field ?? undefined;
  const formState = field?.formState?.errors;
  const fieldName = getField?.name ?? "";
  const fieldError = get(formState, fieldName);
  const hasError = Boolean(fieldError);

  return (
    <FormItem className="gap-0">
      <FormLabel label={label} required={required} helper={helper} />
      <div className="input_mt">
        <Select
          onValueChange={e => {
            let parsedValue: string | number | boolean = e;

            if (dataType === "number") {
              parsedValue = Number(e);
            } else if (dataType === "boolean") {
              parsedValue = e === "true";
            }
            const findOption = options?.length
              ? options.find(item => String(item.value ?? "") === e)
              : {};
            event?.(findOption);
            getField?.onChange?.(parsedValue);
          }}
          value={getField?.value !== undefined ? String(getField.value) : ""}
          disabled={disable || isLoading}
        >
          <SelectTrigger className="w-full label_text" aria-invalid={!!hasError}>
            <SelectValue placeholder={`Select a ${label}`} />
            {isLoading ? (
              <div className="absolute right-2">
                <Spinner size="small" className=" mr-0" />
              </div>
            ) : null}
          </SelectTrigger>
          <SelectContent>
            {options?.length ? (
              options.map((item, index) => {
                return (
                  <SelectItem
                    key={index}
                    value={String(item.value ?? "")}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </SelectItem>
                );
              })
            ) : (
              <SelectItem value="__empty" disabled>
                Empty value
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </FormItem>
  );
}

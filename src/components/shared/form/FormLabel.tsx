import { FormLabel as Label } from "@/components/ui/form";
import MessageHelper from "./MessageHelper";
import React, { PropsWithChildren } from "react";
import { isNil, some } from "lodash";

interface IProps extends PropsWithChildren {
  label?: string;
  required?: boolean;
  helper?: string;
}

const FormLabel = ({ label, required, helper, children }: IProps) => {
  const hasVisibleChildren = some(
    React.Children.toArray(children),
    (child: any) => !isNil(child) && child !== false,
  );
  return (
    <div>
      {hasVisibleChildren ? (
        children
      ) : (
        <Label className="relative flex text-[13px]" label={label}>
          <span className="text-gray-700 dark:text-white"> {label}</span>
          {required && (
            <span className="text-red-600 text-[11px] pl-0.5">*</span>
          )}
          {helper && (
            <div className="flex pl-1 text-primary -mt-1 text-[11px]">
              <MessageHelper helper={helper} />
            </div>
          )}
        </Label>
      )}
    </div>
  );
};
export default FormLabel;

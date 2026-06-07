"use client";

import React, { PropsWithChildren } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IActions {
  ok?: string;
  loading?: boolean;
  event?: () => void;
}

interface IProps extends PropsWithChildren {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  desc?: string;
  side?: "top" | "right" | "bottom" | "left";
  actions?: IActions[];
  submitTitle?: string;
  cancelTitle?: string;
  width?: string;
  isCancel?: boolean;
  isSubmit?: boolean;
  closeEvent?: () => void;
  submitEvent?: () => void;
  isLoading?: boolean;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
}

const SharedSheet = ({
  open,
  setOpen,
  title,
  desc,
  side = "right",
  actions = undefined,
  submitTitle = "Save",
  cancelTitle,
  width = "36rem",
  isCancel = false,
  isSubmit = false,
  closeEvent,
  submitEvent,
  isLoading = false,
  className,
  contentClassName,
  titleClassName,
  children,
}: IProps) => {
  const isHorizontal = side === "left" || side === "right";

  const handleClose = () => {
    setOpen(false);
    closeEvent?.();
  };

  const hasFooter = isCancel || isSubmit || !!actions?.length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side={side}
        className={cn("w-full overflow-y-auto px-5 py-5 gap-4", isHorizontal && "sm:max-w-xl", contentClassName)}
        style={isHorizontal ? { maxWidth: width } : undefined}
      >
        {(title || desc) && (
          <SheetHeader className="px-0">
            {title && <SheetTitle className={cn(titleClassName)}>{title}</SheetTitle>}
            {desc && <SheetDescription>{desc}</SheetDescription>}
          </SheetHeader>
        )}

        <div className="flex-1 overflow-auto">{children}</div>

        {hasFooter && (
          <SheetFooter className="flex-row justify-end gap-2 border-t pt-4">
            {isCancel && (
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                {cancelTitle ?? "Cancel"}
              </Button>
            )}
            {isSubmit && (
              <Button type="button" disabled={isLoading} className={cn(className)} onClick={() => submitEvent?.()}>
                {isLoading ? <Spinner className="text-white" /> : null}
                {isLoading ? "Please wait" : submitTitle}
              </Button>
            )}
            {actions?.length
              ? actions.map((item, index) => (
                  <Button key={index} onClick={() => item?.event?.()} disabled={item?.loading ?? false}>
                    {item?.loading && <Spinner className="text-white" />}
                    {item?.ok}
                  </Button>
                ))
              : null}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SharedSheet;

"use client";

import React, { PropsWithChildren } from "react";
import { isNil, some } from "lodash";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Spinner } from "@/components/ui/spinner";
import { CircleX } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface IActions {
  ok?: string;
  cancel?: string;
  loading?: boolean;
  event?: () => void;
}
interface IProps extends PropsWithChildren {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  desc?: string;
  actions?: IActions[];
  submitTitle?: string;
  cancelTitle?: string;
  width?: string;
  height?: string;
  isCancel?: boolean;
  isClose?: boolean;
  isSubmit?: boolean;
  closeEvent?: () => void;
  submitEvent?: () => void;
  isLoading?: boolean;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
}

const SharedDialog = ({
  open,
  setOpen,
  title,
  desc = undefined,
  actions = undefined,
  submitTitle = "Submit",
  cancelTitle,
  width = "80%",
  height,
  isCancel = true,
  isClose = false,
  isLoading = false,
  closeEvent,
  submitEvent,
  className,
  contentClassName,
  titleClassName,
  isSubmit,
  children,
}: IProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const message =
    desc ??
    "Are you sure you want to delete this record? This action cannot be undone.";
  const hasVisibleChildren = some(
    React.Children.toArray(children),
    (child: any) => !isNil(child) && child !== false,
  );

  const handleClose = () => {
    setOpen(false);
    closeEvent?.();
  };

  const renderContent = () => (
    <div className="overflow-auto px-2">
      {hasVisibleChildren ? children : message}
    </div>
  );

  const renderFooter = () => (
    <>
      {isCancel && (
        <Button variant="outline" onClick={handleClose} disabled={isLoading}>
          {cancelTitle ?? "Cancel"}
        </Button>
      )}
      {isSubmit && (
        <Button
          disabled={isLoading}
          className={cn(className)}
          onClick={() => {
            submitEvent?.();
          }}
        >
          {isLoading ? <Spinner className="text-white" /> : null}
          {isLoading ? "Please wait" : submitTitle}
        </Button>
      )}
      {actions?.length
        ? actions.map((item, index) => {
            return (
              <Button
                key={index}
                onClick={() => {
                  item?.event?.();
                }}
                disabled={item?.loading ?? false}
              >
                {item?.loading && <Spinner className="text-white" />}
                {item?.ok}
              </Button>
            );
          })
        : null}
    </>
  );

  // Mobile: Bottom Sheet
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className={cn(
            "rounded-t-2xl max-h-[95dvh] flex flex-col px-1 py-3",
            contentClassName,
          )}
        >
          <SheetHeader className="relative">
            <SheetTitle className={cn("text-lg font-bold", titleClassName)}>
              {title}
            </SheetTitle>
            <SheetDescription className="sr-only">{desc}</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto py-2">{renderContent()}</div>

          <SheetFooter className="flex-row gap-2 pt-2 border-t">
            {renderFooter()}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: AlertDialog
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        className={cn("gap-2 overflow-y-auto", contentClassName)}
        style={{
          width: width,
          maxWidth: width ?? "42rem",
          height: height ?? "auto",
          maxHeight: "95dvh",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          overflow: "hidden",
        }}
      >
        <AlertDialogHeader className="space-y-1 relative h-10">
          <AlertDialogTitle
            className={cn("text-2xl font-bold fixed", titleClassName)}
          >
            {title}
            {!isClose && (
              <Button
                variant="ghost"
                className="fixed right-2 top-2 text-red-600"
                onClick={handleClose}
                disabled={isClose}
              >
                <CircleX />
              </Button>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        {renderContent()}

        <AlertDialogFooter className="mt-[30px]">
          {isCancel && (
            <AlertDialogCancel onClick={handleClose} disabled={isLoading}>
              {cancelTitle ?? "Cancel"}
            </AlertDialogCancel>
          )}
          {isSubmit && (
            <AlertDialogAction
              disabled={isLoading}
              className={cn(`${className}`)}
              onClick={() => {
                submitEvent?.();
              }}
            >
              {isLoading ? <Spinner className="text-white" /> : null}
              {isLoading ? "Please wait" : submitTitle}
            </AlertDialogAction>
          )}
          {actions?.length
            ? actions.map((item, index) => {
                return (
                  <AlertDialogAction
                    key={index}
                    onClick={() => {
                      item?.event?.();
                    }}
                    disabled={item?.loading ?? false}
                  >
                    {item?.loading && <Spinner className="text-white" />}
                    {item?.ok}
                  </AlertDialogAction>
                );
              })
            : null}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SharedDialog;

"use client";

import { Button } from "@/components/ui/button";
import LoadingButton from "./LoadingButton";
import React from "react";

interface IProps {
  setOpen: (open: boolean) => void;
  handleSubmit?: () => void;
  isLoading?: boolean;
  submitTitle?: string;
  cancelTitle?: string;
  disable?: boolean;
  OtherButton?: React.ReactNode;
}

const ActionButton = ({
  setOpen,
  handleSubmit,
  isLoading = false,
  disable = false,
  cancelTitle,
  submitTitle,
  OtherButton,
}: IProps) => {
  return (
    <div className="flex justify-end gap-2 mt-[10px] py-2 relative">
      <div className="fixed flex bottom-6 space-x-4 !z-10 select-none">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => {
            setOpen(false);
          }}
        >
          {cancelTitle ?? "Cancel"}
        </Button>
        {OtherButton && OtherButton}
        <LoadingButton
          label={submitTitle ?? "Submit"}
          handleEvent={() => handleSubmit?.()}
          isLoading={isLoading}
          disabled={disable}
        />
      </div>
    </div>
  );
};

export default ActionButton;

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ButtonProps } from "@/components/ui/button";

interface SharedButtonProps extends ButtonProps {
  description?: string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}

const SharedButton = React.forwardRef<HTMLButtonElement, SharedButtonProps>(
  ({ description, tooltipSide = "bottom", children, ...props }, ref) => {
    const button = (
      <Button ref={ref} {...props}>
        {children}
      </Button>
    );

    if (!description) return button;

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side={tooltipSide}>{description}</TooltipContent>
      </Tooltip>
    );
  },
);

SharedButton.displayName = "SharedButton";

export { SharedButton };
export type { SharedButtonProps };

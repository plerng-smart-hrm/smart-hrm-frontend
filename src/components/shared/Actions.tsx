import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TypeVariant } from "@/components/shared/button/LoadingButton";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";

export interface IActions {
  name: string;
  event?: (_value?: any) => void;
  icon?: any;
  code?: string;
  loading?: boolean;
  variant?: TypeVariant;
  value?: string;
  tooltip?: string;
}

interface IProps {
  actions: IActions[];
  row: any;
}

export function Actions({ actions, row }: IProps) {
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex h-7 w-7 p-0 data-[state=open]:bg-muted data-[state=open]:text-gray-900 rounded-full bg-red-600 text-white"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[180px]">
          <TooltipProvider delayDuration={200}>
            {actions?.length
              ? actions.map((item: IActions, key: number) => {
                  const Icon = item?.icon ?? null;
                  const menuItem = (
                    <React.Fragment key={`${key}-${row?.id ?? ""}`}>
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={() => {
                          item?.event?.(row);
                        }}
                      >
                        {Icon ? (
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        ) : null}
                        {item?.name ?? ""}
                      </DropdownMenuItem>
                      <Separator />
                    </React.Fragment>
                  );

                  return item.tooltip ? (
                    <Tooltip key={`tooltip-${key}-${row?.id ?? ""}`}>
                      <TooltipTrigger asChild>{menuItem}</TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="text-white bg-slate-500"
                      >
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    menuItem
                  );
                })
              : null}
          </TooltipProvider>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

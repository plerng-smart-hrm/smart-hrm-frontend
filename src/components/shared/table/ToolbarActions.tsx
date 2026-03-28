"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { IActions } from "../Actions";

interface IProps {
  actions?: IActions[];
}
export function ToolbarActions({ actions = [] }: IProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex items-center gap-2 flex-wrap">
        {actions?.length
          ? actions.map((item: IActions, key: number) => {
              const Icon = item?.icon ?? null;
              return (
                <React.Fragment key={key}>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => item?.event?.()}
                  >
                    {Icon && <Icon className="h-4 w-4" />} {item?.name}
                  </Button>
                </React.Fragment>
              );
            })
          : null}
      </div>
    </div>
  );
}

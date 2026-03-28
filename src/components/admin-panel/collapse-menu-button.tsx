"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Dot, LucideIcon } from "lucide-react";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type SubmenuItem = {
  name: string;
  path: string;
  icon?: LucideIcon;
};

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  name: string;
  submenus: SubmenuItem[];
  isOpen: boolean | undefined;
  active: string;
}

export function CollapseMenuButton({
  icon: Icon,
  name,
  submenus,
  isOpen,
  active,
}: CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some((submenu) =>
    active.startsWith(submenu.path),
  );

  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  if (isOpen) {
    return (
      <Collapsible
        open={isCollapsed}
        onOpenChange={setIsCollapsed}
        className="w-full"
      >
        <CollapsibleTrigger
          className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
          asChild
        >
          <Button
            variant={isSubmenuActive ? "secondary" : "ghost"}
            className="h-10 w-full justify-start"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <span className="mr-4">
                  <Icon size={18} />
                </span>
                <p className="max-w-[150px] truncate">{name}</p>
              </div>

              <div>
                <ChevronDown
                  size={18}
                  className="transition-transform duration-200"
                />
              </div>
            </div>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {submenus.map(({ path, name, icon: SubIcon }, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "mb-1 h-10 w-full justify-start",
                active.startsWith(path) && "text-blue-600",
              )}
              asChild
            >
              <Link href={path}>
                <span className="ml-2 mr-4">
                  {SubIcon ? <SubIcon size={18} /> : <Dot size={18} />}
                </span>
                <p className="max-w-[170px] truncate">{name}</p>
              </Link>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isSubmenuActive ? "secondary" : "ghost"}
                className="mb-1 h-10 w-full justify-start"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <span>
                      <Icon size={18} />
                    </span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {submenus.map(({ path, name }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              href={path}
              className={cn(
                "cursor-pointer",
                active.startsWith(path) && "bg-secondary",
              )}
            >
              <p className="max-w-[180px] truncate">{name}</p>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

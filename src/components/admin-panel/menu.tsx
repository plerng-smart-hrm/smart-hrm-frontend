"use client";

import Link from "next/link";
import {
  BookOpen,
  BookTextIcon,
  Bot,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface MenuProps {
  isOpen: boolean | undefined;
}

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Employees",
    path: "/admin/employees",
    icon: User,
  },
  {
    name: "Working Shifts",
    path: "/admin/working-shifts",
    icon: User,
  },
  {
    name: "Sections",
    path: "/admin/sections",
    icon: User,
  },
  {
    name: "Companies",
    path: "/admin/companies",
    icon: Bot,
  },
  {
    name: "Devices",
    path: "/admin/devices",
    icon: Bot,
  },
  {
    name: "Holidays",
    path: "/admin/holidays",
    icon: BookOpen,
  },
  {
    name: "Contract",
    path: "/admin/contracts",
    icon: BookTextIcon,
  },
];

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
          {menuItems.map((item, index) => {
            const isActive = pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <li key={index} className="w-full">
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="mb-1 h-10 w-full justify-start"
                        asChild
                      >
                        <Link href={item.path}>
                          <span className={cn(isOpen === false ? "" : "mr-2")}>
                            <Icon size={14} />
                          </span>
                          <span
                            className={cn(
                              "truncate transition-all",
                              isOpen === false
                                ? "hidden opacity-0"
                                : "block opacity-100",
                            )}
                          >
                            {item.name}
                          </span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    {isOpen === false && (
                      <TooltipContent side="right">{item.name}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            );
          })}

          <li
            className={cn(
              "fixed bottom-2 left-3",
              isOpen ? "w-[calc(15rem-1.5rem)]" : "w-10",
            )}
          >
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => router.push("/signin")}
                    variant="outline"
                    className="mt-5 h-10 w-full justify-center"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <span
                      className={cn(
                        isOpen === false
                          ? "hidden opacity-0"
                          : "block opacity-100",
                      )}
                    >
                      Sign out
                    </span>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}

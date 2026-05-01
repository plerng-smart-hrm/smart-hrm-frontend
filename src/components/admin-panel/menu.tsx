"use client";

import Link from "next/link";
import { BookOpen, BookTextIcon, Bot, ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MenuItem {
  name: string;
  path?: string;
  icon: React.ComponentType<{ size?: number }>;
  children?: MenuItem[];
}

interface MenuProps {
  isOpen: boolean | undefined;
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Employees",
    path: "/admin/employees",
    icon: User,
    children: [
      {
        name: "Employees",
        path: "/admin/employees",
        icon: User,
      },
      {
        name: "Terminations",
        path: "/admin/employees/terminations",
        icon: User,
      },
    ],
  },
  {
    name: "Working Shifts",
    path: "/admin/working-shifts",
    icon: User,
  },
  {
    name: "Departments",
    path: "/admin/departments",
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
  {
    name: "Attendances",
    icon: BookTextIcon,
    children: [
      { name: "Detail", path: "/admin/attendances/detail", icon: User },
      { name: "Summary", path: "/admin/attendances/summary", icon: User },
      {
        name: "Attendance Logs",
        path: "/admin/attendances/logs",
        icon: User,
      },
      {
        name: "Attendance Adjustment",
        path: "/admin/attendances/adjustments",
        icon: User,
      },
    ],
  },
];

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const handleParentClick = (item: MenuItem) => {
    const firstChildPath = item.children?.[0]?.path;
    const matchedChild = item.children?.find((child) => child.path && pathname.startsWith(child.path));
    const target = matchedChild?.path ?? item.path ?? firstChildPath;
    if (target) router.push(target);
    setOpenSubmenus((prev) => (prev.includes(item.name) ? prev : [...prev, item.name]));
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.path
      ? pathname.startsWith(item.path)
      : (item.children?.some((c) => c.path && pathname.startsWith(c.path)) ?? false);
    const isSubmenuOpen = openSubmenus.includes(item.name);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <li key={index} className="w-full">
          <Collapsible open={isSubmenuOpen} onOpenChange={() => toggleSubmenu(item.name)}>
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="mb-1 h-10 w-full justify-start"
                    onClick={() => handleParentClick(item)}
                  >
                    <span className={cn(isOpen === false ? "" : "mr-2")}>
                      <Icon size={14} />
                    </span>
                    <span
                      className={cn(
                        "flex-1 truncate text-left transition-all",
                        isOpen === false ? "hidden opacity-0" : "block opacity-100",
                      )}
                    >
                      {item.name}
                    </span>
                    {isOpen !== false && (
                      <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <span className="ml-auto flex items-center">
                          <ChevronDown
                            size={14}
                            className={cn("transition-transform duration-200", isSubmenuOpen && "rotate-180")}
                          />
                        </span>
                      </CollapsibleTrigger>
                    )}
                  </Button>
                </TooltipTrigger>
                {isOpen === false && <TooltipContent side="right">{item.name}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
            <CollapsibleContent className={cn("overflow-hidden transition-all", isOpen === false && "hidden")}>
              <ul className="ml-4 space-y-1 border-l pl-2">
                {item.children?.map((child, childIndex) => {
                  const isChildActive = child.path ? pathname === child.path : false;
                  const ChildIcon = child.icon;

                  return (
                    <li key={childIndex}>
                      <Button
                        variant={isChildActive ? "secondary" : "ghost"}
                        className="h-9 w-full justify-start"
                        asChild
                      >
                        <Link href={child.path ?? "#"}>
                          <span className="mr-2">
                            <ChildIcon size={12} />
                          </span>
                          <span className="truncate">{child.name}</span>
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </li>
      );
    }

    return (
      <li key={index} className="w-full">
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button variant={isActive ? "secondary" : "ghost"} className="mb-1 h-10 w-full justify-start" asChild>
                <Link href={item.path ?? "#"}>
                  <span className={cn(isOpen === false ? "" : "mr-2")}>
                    <Icon size={14} />
                  </span>
                  <span
                    className={cn(
                      "truncate transition-all",
                      isOpen === false ? "hidden opacity-0" : "block opacity-100",
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              </Button>
            </TooltipTrigger>
            {isOpen === false && <TooltipContent side="right">{item.name}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </li>
    );
  };

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
          {menuItems.map((item, index) => renderMenuItem(item, index))}

          <li className={cn("fixed bottom-2 left-3", isOpen ? "w-[calc(15rem-1.5rem)]" : "w-10")}>
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
                    <span className={cn(isOpen === false ? "hidden opacity-0" : "block opacity-100")}>Sign out</span>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}

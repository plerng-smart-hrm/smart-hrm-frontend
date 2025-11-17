"use client";
import * as React from "react";
import {
  BookOpen,
  BookTextIcon,
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: {
    name: "Deluxe",
    logo: GalleryVerticalEnd,
    plan: "Deluxe Online Store",
  },
  navMain: [
    {
      title: "Employees",
      url: "/admin/employees",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Categories",
          url: "/admin/categories",
        },
        {
          title: "Products",
          url: "/admin/products",
        },
      ],
    },
    {
      title: "Devices",
      url: "/admin/devices",
      icon: Bot,
    },
    {
      title: "Holidays",
      url: "/admin/holidays",
      icon: BookOpen,
    },
    {
      title: "Contract",
      url: "/admin/contracts",
      icon: BookTextIcon,
      items: [
        {
          title: "Contract Types",
          url: "/admin/contract-types",
        },
        {
          title: "Contracts",
          url: "/admin/contracts",
        },
      ],
    },
    {
      title: "Leaves",
      url: "/admin/leaves",
      icon: BookTextIcon,
      items: [
        {
          title: "Leave Types",
          url: "/admin/leave-types",
        },
        {
          title: "Leaves Requests",
          url: "/admin/leave-requests",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher team={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

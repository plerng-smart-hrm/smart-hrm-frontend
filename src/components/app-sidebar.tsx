"use client";
import * as React from "react";
import {
  BookOpen,
  BookTextIcon,
  Bot,
  GalleryVerticalEnd,
  SettingsIcon,
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
    name: "Ratana",
    email: "ratana.san@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: {
    name: "Smart HRM",
    logo: GalleryVerticalEnd,
    plan: "Smart HRM System",
  },
  navMain: [
    {
      title: "Employees",
      url: "/admin/employees",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Employees",
          url: "/admin/employees",
        },
      ],
    },
    {
      title: "Companies",
      url: "/admin/companies",
      icon: Bot,
    },
    {
      title: "Attendances",
      url: "/admin/attendance",
      icon: BookTextIcon,
      items: [
        {
          title: "Attendance Logs",
          url: "/admin/attendance-logs",
        },
        {
          title: "Attendance Summary",
          url: "/admin/attendance-summaries",
        },
      ],
    },
    {
      title: "Devices",
      url: "/admin/devices",
      icon: Bot,
    },
    {
      title: "Working Shifts",
      url: "/admin/working-shifts",
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
    {
      title: "Settings",
      url: "/admin/leaves",
      icon: SettingsIcon,
      items: [
        {
          title: "Companies",
          url: "/admin/companies",
        },
        {
          title: "Departments",
          url: "/admin/departments",
        },
        {
          title: "Sections",
          url: "/admin/sections",
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

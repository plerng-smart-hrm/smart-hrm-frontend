"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Cake, CalendarDays, FileSignature, Phone, User } from "lucide-react";
import { getEmployeeById } from "@/service/admin/employees.service";
import { employeeDetailKey, employeeKeys } from "@/service/util/query-keys/employee";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PersonalTab from "./tabs/PersonalTab";
import JobTab from "./tabs/JobTab";
import ContractTab from "./tabs/ContractTab";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { IEmployee } from "@/types/admin/employee";
import { formatDate } from "date-fns";
import { formatToDate } from "@/utils/custom-format";

interface Props {
  employeeId: string;
}

const TABS = [
  { key: "personal", label: "Personal", icon: User },
  { key: "job", label: "Job", icon: Briefcase },
  { key: "contract", label: "Contract", icon: FileSignature },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const getStatusColor = (status?: string) => {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
    case "PERMANENT":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "PROBATION":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    case "CONTRACT":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "INACTIVE":
    case "RESIGNED":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
};

export default function EmployeeProfileClient({ employeeId }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("personal");

  const { data, isLoading } = useQueryShared({
    url: `/v1/employees/${employeeId}`,
    key: `${employeeKeys.list_employee}_${employeeId}`,
  });

  const employee = (data?.data as IEmployee) ?? undefined;

  if (isLoading) {
    return <LoadingOverlay isLoading fullScreen />;
  }

  const fullNameEn = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
  const fullNameKh =
    employee.firstNameKh && employee.lastNameKh ? `${employee.firstNameKh} ${employee.lastNameKh}` : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Avatar */}
        <div className="h-24 w-24 shrink-0 rounded-xl bg-secondary/30 flex items-center justify-center overflow-hidden border shadow-sm">
          <img src={employee.profileUrl || "/no-profile.png"} alt="Profile" className="h-full w-full object-cover" />
        </div>

        {/* Identity + meta */}
        <div className="text-center sm:text-left flex-1 min-w-0">
          <h2 className="text-xl font-semibold truncate">{fullNameEn || "N/A"}</h2>
          {fullNameKh && <p className="text-muted-foreground">{fullNameKh}</p>}

          {employee.position && <p className="text-sm text-muted-foreground mt-0.5">{employee.position}</p>}

          {/* Quick facts */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1.5 mt-4 text-sm">
            {employee.phone && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {employee.phone}
              </span>
            )}
            {employee.dateOfBirth && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Cake className="h-3.5 w-3.5 shrink-0" />
                {formatToDate(employee.dateOfBirth)}
              </span>
            )}
            {employee.startDate && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                Joined {formatToDate(employee.startDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        {activeTab === "personal" && <PersonalTab employee={employee} />}
        {activeTab === "job" && <JobTab employee={employee} />}
        {activeTab === "contract" && <ContractTab employee={employee} />}
      </div>
    </div>
  );
}

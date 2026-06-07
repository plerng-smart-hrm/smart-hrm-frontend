"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, FileSignature, User } from "lucide-react";
import { getEmployeeById } from "@/service/admin/employees.service";
import { employeeDetailKey } from "@/service/util/query-keys/employee";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PersonalTab from "./tabs/PersonalTab";
import JobTab from "./tabs/JobTab";
import ContractTab from "./tabs/ContractTab";

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

  const { data, isFetching } = useQuery({
    queryKey: employeeDetailKey(Number(employeeId)),
    queryFn: () => getEmployeeById(Number(employeeId)),
    enabled: !!employeeId,
  });

  const employee = data?.employee;

  if (isFetching && !employee) {
    return <LoadingOverlay isLoading fullScreen />;
  }

  if (!employee) {
    return <div className="flex items-center justify-center h-60 text-muted-foreground">Employee not found</div>;
  }

  const fullNameEn = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
  const fullNameKh =
    employee.firstNameKh && employee.lastNameKh ? `${employee.firstNameKh} ${employee.lastNameKh}` : null;

  return (
    <div className="space-y-6">
      <Heading title={fullNameEn || "Employee"} description={employee.position || "Employee profile"} backButtonHref="/admin/employees" />

      <Card>
        <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-5 py-5">
          <div className="h-24 w-24 shrink-0 rounded-xl bg-secondary/30 flex items-center justify-center overflow-hidden border shadow-sm">
            <img src={employee.profileUrl || "/no-profile.png"} alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl font-semibold">{fullNameEn || "N/A"}</h2>
            {fullNameKh && <p className="text-muted-foreground">{fullNameKh}</p>}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 flex-wrap">
              <Badge variant="outline" className="font-normal shadow-sm">
                {employee.empCode || "N/A"}
              </Badge>
              {employee.gender && (
                <Badge className="font-normal shadow-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {employee.gender}
                </Badge>
              )}
              {employee.employeeStatus && (
                <Badge className={cn("font-normal shadow-sm", getStatusColor(employee.employeeStatus))}>
                  {employee.employeeStatus}
                </Badge>
              )}
              {employee.workStatus && (
                <Badge className={cn("font-normal shadow-sm", getStatusColor(employee.workStatus))}>
                  {employee.workStatus}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

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

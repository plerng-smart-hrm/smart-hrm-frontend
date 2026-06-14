"use client";

import { parseAsStringEnum, useQueryState } from "nuqs";
import {
  BellDot,
  Briefcase,
  CalendarClock,
  CalendarDays,
  Clock,
  FileSignature,
  Fingerprint,
  MessageCircleWarningIcon,
  User,
} from "lucide-react";
import { employeeKeys } from "@/service/util/query-keys/employee";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { cn } from "@/lib/utils";
import { RenderView } from "@/components/shared/view/RenderView";
import PersonalTab from "./tabs/PersonalTab";
import ContractTab from "./tabs/ContractTab";
import AttendanceTab from "./tabs/AttendanceTab";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { IEmployee } from "@/types/admin/employee";
import { formatToDate } from "@/utils/custom-format";
import { formatShiftRange } from "@/components/comboboxes/TimeShiftCombobox";
import WarningTab from "./tabs/WarningTab";
import LeaveRequestTab from "./tabs/LeaveRequestTab";
import FingerPrintTab from "./tabs/FingerPrintTab";

interface Props {
  employeeId: string;
}

const TABS = [
  { key: "ATTENDANCE", label: "Attendance", icon: CalendarClock },
  { key: "PERSONAL", label: "Personal", icon: User },
  { key: "CONTRACT", label: "Contract", icon: FileSignature },
  { key: "LEAVE_REQUEST", label: "Leave Request", icon: BellDot },
  { key: "WARNING", label: "Waring", icon: MessageCircleWarningIcon },
  { key: "FINGERPRINT", label: "Finger Print", icon: Fingerprint },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const tabKeys = TABS.map((tab) => tab.key) as TabKey[];

export default function EmployeeProfileClient({ employeeId }: Props) {
  const [activeTab, setActiveTab] = useQueryState("tab", parseAsStringEnum<TabKey>(tabKeys).withDefault("ATTENDANCE"));

  const { data, isLoading } = useQueryShared({
    url: `/v1/employees/${employeeId}`,
    key: `${employeeKeys.list_employee}_${employeeId}`,
    enable: !!employeeId,
  });

  const employee = (data?.data as IEmployee) ?? undefined;

  if (isLoading) {
    return <LoadingOverlay isLoading fullScreen />;
  }

  const fullNameEn = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
  const fullNameKh =
    employee.firstNameKh && employee.lastNameKh ? `${employee.firstNameKh} ${employee.lastNameKh}` : null;

  return (
    <div>
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 shrink-0">
            <div className="h-24 w-24 shrink-0 rounded-xl bg-secondary/30 flex items-center justify-center overflow-hidden border shadow-sm">
              <img
                src={employee.profileUrl || "/no-profile.png"}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground mt-0.5">ID: {employee.empCode}</p>
              <h2 className="text-md">{fullNameEn || "N/A"}</h2>
              {fullNameKh && <p className="text-muted-foreground">{fullNameKh}</p>}
              <p className="text-sm text-muted-foreground mt-0.5">{employee.gender}</p>
            </div>
          </div>

          <RenderView
            className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:border-l sm:pl-6"
            fields={[
              { icon: <Briefcase className="h-4 w-4" />, label: "Position", value: employee.position },
              {
                icon: <Briefcase className="h-4 w-4" />,
                label: "Department",
                value: employee.section?.department?.name,
              },
              { icon: <Briefcase className="h-4 w-4" />, label: "Section", value: employee.section?.name },
              {
                icon: <Clock className="h-4 w-4" />,
                label: "Time Shift",
                value: formatShiftRange(
                  employee.timeShift?.fIn,
                  employee.timeShift?.fOut,
                  employee.timeShift?.sIn,
                  employee.timeShift?.sOut,
                ),
              },
              {
                icon: <Clock className="h-4 w-4" />,
                label: "Employee Type",
                value: employee.employeeType,
              },
              {
                icon: <CalendarDays className="h-4 w-4" />,
                label: "Joined Date",
                value: formatToDate(employee.startDate),
              },
            ]}
          />
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
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer",
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
      </div>
      <div className="pt-2">
        {activeTab === "PERSONAL" && <PersonalTab employee={employee} />}
        {activeTab === "CONTRACT" && <ContractTab employee={employee} />}
        {activeTab === "ATTENDANCE" && <AttendanceTab employee={employee} />}
        {activeTab === "WARNING" && <WarningTab employee={employee} />}
        {activeTab === "LEAVE_REQUEST" && <LeaveRequestTab employee={employee} />}
        {activeTab === "FINGERPRINT" && <FingerPrintTab employee={employee} />}
      </div>
    </div>
  );
}

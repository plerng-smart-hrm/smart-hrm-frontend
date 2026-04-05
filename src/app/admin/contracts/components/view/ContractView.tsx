"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, parseISO } from "date-fns";
import { IContract } from "@/types/admin/contract";
import { RenderView, Section } from "@/components/shared/view/RenderView";
import {
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Hash,
  Briefcase
} from "lucide-react";

interface Props {
  contract?: IContract;
}

export default function ContractView({ contract }: Props) {
  if (!contract) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        No contract data available
      </div>
    );
  }

  const employee = contract.employee;
  const fullNameEn = employee
    ? `${employee.firstName || ""} ${employee.lastName || ""}`.trim()
    : null;
  const fullNameKh =
    employee?.firstNameKh && employee?.lastNameKh
      ? `${employee.firstNameKh} ${employee.lastNameKh}`
      : null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return format(parseISO(dateStr), "dd MMM yyyy");
    } catch {
      return dateStr;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "INACTIVE":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "-";
    return `$${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-6 pr-4 pb-10">
      {/* Header Section - Employee Profile & Contract Core Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Profile Identity */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 md:w-2/5 shrink-0">
          <div className="h-32 w-32 shrink-0 rounded-xl bg-secondary/30 flex items-center justify-center overflow-hidden border shadow-sm">
            <img
              src={employee?.profileUrl || "/no-profile.png"}
              alt="Profile"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/no-profile.png";
              }}
            />
          </div>
          <div className="text-center sm:text-left flex-1 mt-2 sm:mt-0">
            <h2 className="text-xl font-semibold">{fullNameEn || "Unknown Employee"}</h2>
            {fullNameKh && <p className="text-muted-foreground">{fullNameKh}</p>}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 flex-wrap">
              <Badge variant="outline" className="font-normal shadow-sm">
                {employee?.empCode || "N/A"}
              </Badge>
              {contract.status && (
                <Badge className={`font-normal shadow-sm ${getStatusColor(contract.status)}`}>
                  {contract.status}
                </Badge>
              )}
            </div>
            {employee?.position && (
              <p className="text-sm font-medium mt-3 flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                {employee.position}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Contract Core Information */}
        <div className="flex-1">
          <Section title="Contract Details">
            <RenderView
              className="grid-cols-1 sm:grid-cols-2 gap-y-5"
              fields={[
                {
                  label: "Contract Type",
                  value: contract.contractType,
                },
                {
                  label: "Base Salary",
                  value: formatCurrency(contract.baseSalary),
                },
                {
                  label: "Start Date",
                  value: formatDate(contract.startDate),
                },
                {
                  label: "End Date",
                  value: formatDate(contract.endDate),
                },
                {
                  label: "Is Expired",
                  value: contract.isExpired ? "Yes" : "No",
                },
              ]}
            />
          </Section>
        </div>
      </div>

      <Separator />

      {/* Allowances & Benefits */}
      <Section title="Allowances & Benefits">
        <RenderView
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          fields={[
            {
              icon: <DollarSign className="h-4 w-4" />,
              label: "Food Allowance / Day",
              value: formatCurrency(contract.foodAllowancePerDay),
            },
            {
              icon: <DollarSign className="h-4 w-4" />,
              label: "Transport Allowance",
              value: formatCurrency(contract.transportAllowance),
            },
            {
              icon: <DollarSign className="h-4 w-4" />,
              label: "Attendance Bonus",
              value: formatCurrency(contract.attendanceBonus),
            },
          ]}
        />
      </Section>

      <Separator />

      {/* Skills & OT Rates */}
      <Section title="Skills & OT Rates">
        <RenderView
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          fields={[
            {
              icon: <TrendingUp className="h-4 w-4" />,
              label: "Skill Level",
              value: contract.skillLevel,
            },
            {
              icon: <DollarSign className="h-4 w-4" />,
              label: "Skill Allowance",
              value: formatCurrency(contract.skillAllowance),
            },
            {
              icon: <TrendingUp className="h-4 w-4" />,
              label: "OT Rate (Normal)",
              value: formatCurrency(contract.otRateNormal),
            },
            {
              icon: <TrendingUp className="h-4 w-4" />,
              label: "OT Rate (Excess)",
              value: formatCurrency(contract.otRateExcess),
            },
          ]}
        />
      </Section>

      {contract.contractDetail && (
        <>
          <Separator />
          <Section title="Contract Outline" icon={<FileText className="h-4 w-4" />}>
            <p className="text-sm border rounded-lg p-3 bg-secondary/10 whitespace-pre-wrap">{contract.contractDetail}</p>
          </Section>
        </>
      )}

      <Separator />

      {/* System Information */}
      <Section title="System Information" icon={<Hash className="h-4 w-4" />}>
        <RenderView
          fields={[
            {
              icon: <Hash className="h-4 w-4" />,
              label: "Contract ID",
              value: contract.id?.toString(),
            },
            {
              icon: <Calendar className="h-4 w-4" />,
              label: "Created At",
              value: formatDate(contract.createdAt),
            },
            {
              icon: <Calendar className="h-4 w-4" />,
              label: "Updated At",
              value: formatDate(contract.updatedAt),
            },
          ]}
        />
      </Section>
    </div>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, parseISO } from "date-fns";
import { RenderView, Section } from "@/components/shared/view/RenderView";
import { Calendar, Hash, User, CheckCircle } from "lucide-react";
import { IAttAdjustment } from "@/types/admin/att-adjustment";

interface Props {
  initialData?: IAttAdjustment;
}

export default function AttAdjustmentView({ initialData }: Props) {
  if (!initialData) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        No attendance adjustment data available
      </div>
    );
  }

  const employee = initialData.employee;
  const fullNameEn = employee ? `${employee.firstName || ""} ${employee.lastName || ""}`.trim() : null;
  const fullNameKh =
    employee?.firstNameKh && employee?.lastNameKh ? `${employee.firstNameKh} ${employee.lastNameKh}` : null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return format(parseISO(dateStr), "dd MMM yyyy");
    } catch {
      return dateStr;
    }
  };

  const getApprovalStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "REJECTED":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6 pr-4 pb-10">
      {/* Header Section - Employee Profile */}
      <div className="flex flex-col md:flex-row gap-6">
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
              {initialData.approvalStatus && (
                <Badge className={`font-normal shadow-sm ${getApprovalStatusColor(initialData.approvalStatus)}`}>
                  {initialData.approvalStatus}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Adjustment Core Info */}
        <div className="flex-1">
          <Section title="Adjustment Details">
            <RenderView
              className="grid-cols-1 sm:grid-cols-2 gap-y-5"
              fields={[
                {
                  label: "Date",
                  value: formatDate(initialData.date),
                  icon: <Calendar className="h-4 w-4" />,
                },
                {
                  label: "Field Changed",
                  value: initialData.fieldChanged,
                },
                {
                  label: "Old Value",
                  value: initialData.oldValue,
                },
                {
                  label: "New Value",
                  value: initialData.newValue,
                },
                {
                  label: "Reason",
                  value: initialData.reason,
                  fullWidth: true,
                },
              ]}
            />
          </Section>
        </div>
      </div>

      <Separator />

      {/* Approval & Status */}
      <Section title="Approval & Status" icon={<CheckCircle className="h-4 w-4" />}>
        <RenderView
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          fields={[
            {
              label: "Approval Status",
              value: initialData.approvalStatus,
            },
            {
              label: "Is Applied",
              value: initialData.isApplied !== undefined ? (initialData.isApplied ? "Yes" : "No") : undefined,
            },
            {
              label: "Is Active",
              value: initialData.isActive !== undefined ? (initialData.isActive ? "Yes" : "No") : undefined,
            },
            {
              label: "Requested By",
              value: initialData.requestedBy?.toString(),
              icon: <User className="h-4 w-4" />,
            },
            {
              label: "Approved By",
              value: initialData.approvedBy?.toString(),
              icon: <User className="h-4 w-4" />,
            },
          ]}
        />
      </Section>

      <Separator />

      {/* System Information */}
      <Section title="System Information">
        <RenderView
          fields={[
            {
              icon: <Hash className="h-4 w-4" />,
              label: "Adjustment ID",
              value: initialData.id?.toString(),
            },
            {
              icon: <Hash className="h-4 w-4" />,
              label: "Attendance Summary ID",
              value: initialData.attendanceSummaryId?.toString(),
            },
            {
              icon: <Calendar className="h-4 w-4" />,
              label: "Created At",
              value: formatDate(initialData.createdAt),
            },
            {
              icon: <Calendar className="h-4 w-4" />,
              label: "Updated At",
              value: formatDate(initialData.updatedAt),
            },
            {
              icon: <User className="h-4 w-4" />,
              label: "Created By",
              value: initialData.createdBy?.toString(),
            },
            {
              icon: <User className="h-4 w-4" />,
              label: "Updated By",
              value: initialData.updatedBy?.toString(),
            },
          ]}
        />
      </Section>
    </div>
  );
}

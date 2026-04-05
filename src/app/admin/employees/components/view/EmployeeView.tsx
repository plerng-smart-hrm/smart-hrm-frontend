"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Briefcase,
  Calendar,
  Hash,
  Phone,
  MapPin,
  GraduationCap,
  Users,
  FileText,
  Clock,
  Heart,
  Globe,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { IEmployee } from "@/types/admin/employee";
import { RenderView, Section } from "@/components/shared/view/RenderView";

interface EmployeeViewProps {
  employee: IEmployee | null;
}

export default function EmployeeView({ employee }: EmployeeViewProps) {
  if (!employee) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">No employee data available</div>
    );
  }

  const fullNameEn = `${employee.firstName || ""} ${employee.lastName || ""}`.trim();
  const fullNameKh =
    employee.firstNameKh && employee.lastNameKh ? `${employee.firstNameKh} ${employee.lastNameKh}` : null;

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

  const getGenderColor = (gender?: string) => {
    switch (gender?.toUpperCase()) {
      case "MALE":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "FEMALE":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6 pr-4 pb-10">
      {/* Header Section - Employee Profile & Work Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Profile Identity */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 md:w-2/5 shrink-0">
          <div className="h-32 w-32 shrink-0 rounded-xl bg-secondary/30 flex items-center justify-center overflow-hidden border shadow-sm">
            <img src={employee.profileUrl || "/no-profile.png"} alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div className="text-center sm:text-left flex-1 mt-2 sm:mt-0">
            <h2 className="text-xl font-semibold">{fullNameEn || "N/A"}</h2>
            {fullNameKh && <p className="text-muted-foreground">{fullNameKh}</p>}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 flex-wrap">
              <Badge variant="outline" className="font-normal shadow-sm">
                {employee.empCode || "N/A"}
              </Badge>
              {employee.gender && (
                <Badge className={`font-normal shadow-sm ${getGenderColor(employee.gender)}`}>{employee.gender}</Badge>
              )}
              {employee.employeeStatus && (
                <Badge className={`font-normal shadow-sm ${getStatusColor(employee.employeeStatus)}`}>
                  {employee.employeeStatus}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Work Information */}
        <div className="flex-1">
          <Section title="Work Information">
            <RenderView
              className="grid-cols-1 sm:grid-cols-2 gap-y-5"
              fields={[
                {
                  label: "Position",
                  value: employee.position,
                },
                {
                  label: "Employee Type",
                  value: employee.employeeType,
                },
                {
                  label: "Work Status",
                  value: employee.workStatus,
                },
                {
                  label: "Start Date",
                  value: formatDate(employee.startDate),
                },
                {
                  label: "End Date",
                  value: formatDate(employee.endDate),
                },
                {
                  label: "Working Shift",
                  value: employee.workingShiftId?.toString(),
                },
              ]}
            />
          </Section>
        </div>
      </div>

      <Separator />

      {/* Personal Information */}
      <Section title="Personal Information">
        <RenderView
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          fields={[
            {
              icon: <Calendar className="h-4 w-4" />,
              label: "Date of Birth",
              value: formatDate(employee.dateOfBirth),
            },
            {
              icon: <MapPin className="h-4 w-4" />,
              label: "Place of Birth",
              value: employee.placeOfBirth,
            },
            {
              icon: <Globe className="h-4 w-4" />,
              label: "Nationality",
              value: employee.nationality,
            },
            {
              icon: <Users className="h-4 w-4" />,
              label: "Race",
              value: employee.race,
            },
            {
              icon: <Heart className="h-4 w-4" />,
              label: "Marital Status",
              value: employee.maritalStatus,
            },
            {
              icon: <Users className="h-4 w-4" />,
              label: "Children",
              value: employee.childrenNumber?.toString(),
            },
          ]}
        />
      </Section>

      <Separator />

      {/* Contact Information */}
      <Section title="Contact Information">
        <RenderView
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          fields={[
            {
              icon: <Phone className="h-4 w-4" />,
              label: "Phone",
              value: employee.phone,
            },
            {
              icon: <MapPin className="h-4 w-4" />,
              label: "Current Address",
              value: employee.currentAddress,
            },
            {
              icon: <GraduationCap className="h-4 w-4" />,
              label: "Education",
              value: employee.education,
            },
            {
              icon: <FileText className="h-4 w-4" />,
              label: "ID Card No",
              value: employee.idCardNo,
            },
            {
              icon: <FileText className="h-4 w-4" />,
              label: "Labor Book No",
              value: employee.laborBookNo,
            },
            {
              icon: <FileText className="h-4 w-4" />,
              label: "NSSF Register No",
              value: employee.nssfRegisterNo,
            },
          ]}
        />
      </Section>

      <Separator />

      <Separator />

      {/* System Information */}
      <Section title="System Information" icon={<Hash className="h-4 w-4" />}>
        <RenderView
          fields={[
            {
              icon: <Hash className="h-4 w-4" />,
              label: "Employee ID",
              value: employee.id?.toString(),
            },
            {
              icon: <Calendar className="h-4 w-4" />,
              label: "Created At",
              value: formatDate(employee.createdAt),
            },
            {
              icon: <Calendar className="h-4 w-4" />,
              label: "Updated At",
              value: formatDate(employee.updatedAt),
            },
          ]}
        />
      </Section>
    </div>
  );
}

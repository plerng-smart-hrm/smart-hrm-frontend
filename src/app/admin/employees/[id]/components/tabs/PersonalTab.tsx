"use client";

import { Separator } from "@/components/ui/separator";
import { Calendar, FileText, GraduationCap, Globe, Heart, MapPin, Phone, Users } from "lucide-react";
import { format, parseISO } from "date-fns";
import { IEmployee } from "@/types/admin/employee";
import { RenderView, Section } from "@/components/shared/view/RenderView";

interface Props {
  employee: IEmployee;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  try {
    return format(parseISO(dateStr), "dd MMM yyyy");
  } catch {
    return dateStr;
  }
};

export default function PersonalTab({ employee }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Personal Information">
        <RenderView
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          fields={[
            { label: "Date of Birth", value: formatDate(employee.dateOfBirth) },
            { label: "Place of Birth", value: employee.placeOfBirth },
            { label: "Nationality", value: employee.nationality },
            { label: "Race", value: employee.race },
            { label: "Marital Status", value: employee.maritalStatus },
            { label: "Children", value: employee.childrenNumber?.toString() },
          ]}
        />
      </Section>

      <Separator />

      <Section title="Contact Information">
        <RenderView
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          fields={[
            { icon: <Phone className="h-4 w-4" />, label: "Phone", value: employee.phone },
            {
              icon: <MapPin className="h-4 w-4" />,
              label: "Current Address",
              value: employee.currentAddress,
              fullWidth: true,
            },
            { icon: <GraduationCap className="h-4 w-4" />, label: "Education", value: employee.education },
          ]}
        />
      </Section>

      <Separator />

      <Section title="Documents">
        <RenderView
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          fields={[
            { icon: <FileText className="h-4 w-4" />, label: "ID Card No", value: employee.idCardNo },
            { icon: <FileText className="h-4 w-4" />, label: "Labor Book No", value: employee.laborBookNo },
            { icon: <FileText className="h-4 w-4" />, label: "NSSF Register No", value: employee.nssfRegisterNo },
          ]}
        />
      </Section>
    </div>
  );
}

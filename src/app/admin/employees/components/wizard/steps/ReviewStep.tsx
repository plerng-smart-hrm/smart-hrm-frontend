"use client";

import React from "react";
import { Briefcase, PenLine, User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDefinition } from "@/components/shared/form/RenderField";
import { contractStepFields } from "../wizardFields";
import { employeeFields } from "../../form/employeeFormField";
import { WizardData } from "../EmployeeOnboardingWizard";

interface IProps {
  data: WizardData;
  onEdit: (step: number) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const labelFor = (fields: FieldDefinition[], key: string, value?: string | number) => {
  const field = fields.find((f) => f.key === key);
  const option = field?.options?.find((o) => String(o.value) === String(value));
  return option?.label ?? (value || "—");
};

function SummaryCard({
  icon,
  title,
  step,
  onEdit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 py-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primary">{icon}</div>
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <div className="text-sm text-muted-foreground mt-1">{children}</div>
          </div>
        </div>
        <Button type="button" variant="ghost" size="sm" className="gap-1 shrink-0" onClick={() => onEdit(step)}>
          <PenLine className="h-3.5 w-3.5" />
          Edit
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ReviewStep({ data, onEdit, onBack, onSubmit, isSubmitting }: IProps) {
  const personal = data.personal;
  const job = data.job;
  const contract = data.contract;

  const fullNameEn = `${personal?.firstName ?? ""} ${personal?.lastName ?? ""}`.trim();
  const fullNameKh =
    personal?.firstNameKh && personal?.lastNameKh ? `${personal.firstNameKh} ${personal.lastNameKh}` : null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Please check everything looks right</h3>
        <p className="text-sm text-muted-foreground">
          មុនពេលរក្សាទុក &middot; You can go back and edit any section before we save it.
        </p>
      </div>

      <div className="space-y-3">
        <SummaryCard icon={<User className="h-5 w-5" />} title="Personal Info" step={0} onEdit={onEdit}>
          <p className="font-medium text-foreground">
            {fullNameEn || "—"} {fullNameKh && <span className="text-muted-foreground font-normal">· {fullNameKh}</span>}
          </p>
          <p>
            {labelFor(employeeFields, "gender", personal?.gender)} &middot; Code: {personal?.empCode || "—"} &middot;{" "}
            DOB: {personal?.dateOfBirth || "—"}
          </p>
        </SummaryCard>

        <SummaryCard icon={<Briefcase className="h-5 w-5" />} title="Job & Shift" step={1} onEdit={onEdit}>
          <p className="font-medium text-foreground">{job?.position || "—"}</p>
          <p>
            Starts {job?.startDate || "—"} &middot; {labelFor(employeeFields, "employeeStatus", job?.employeeStatus)} &middot;{" "}
            {labelFor(employeeFields, "workStatus", job?.workStatus)}
          </p>
        </SummaryCard>

        <SummaryCard icon={<Wallet className="h-5 w-5" />} title="Salary & Contract" step={2} onEdit={onEdit}>
          <p className="font-medium text-foreground">
            {labelFor(contractStepFields, "contractType", contract?.contractType)} &middot; ${contract?.baseSalary ?? 0}/month
          </p>
          <p>
            {contract?.startDate || "—"} → {contract?.endDate || "—"} &middot;{" "}
            {labelFor(contractStepFields, "status", contract?.status)}
          </p>
        </SummaryCard>
      </div>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          ← Back
        </Button>
        <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Creating…" : "✓ Create Employee"}
        </Button>
      </div>
    </div>
  );
}

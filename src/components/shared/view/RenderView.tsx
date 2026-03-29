import React from "react";
import { cn } from "@/lib/utils";

export interface ViewFieldDefinition {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

interface RenderViewProps {
  fields: ViewFieldDefinition[];
  className?: string;
}

export function RenderView({ fields, className }: RenderViewProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {fields.map((field, index) => (
        <InfoItem key={index} icon={field.icon} label={field.label} value={field.value} fullWidth={field.fullWidth} />
      ))}
    </div>
  );
}

export function Section({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

export function InfoItem({
  icon,
  label,
  value,
  fullWidth = false,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  fullWidth?: boolean;
}) {
  const displayValue = value === null || value === undefined || value === "" ? "N/A" : value;

  return (
    <div className={cn("flex items-start gap-3", fullWidth ? "sm:col-span-2 lg:col-span-3" : "")}>
      {icon && <div className="text-muted-foreground mt-0.5 shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="text-sm font-medium wrap-break-word">{displayValue}</div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { CalendarClock, DollarSign, FileSignature, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SharedDialog from "@/components/shared/SharedDialog";
import { IEmployee } from "@/types/admin/employee";
import ContractView from "@/app/admin/contracts/components/view/ContractView";
import ContractPanel from "./ContractPanel";

interface Props {
  employee: IEmployee;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "—";
  try {
    return format(parseISO(dateStr), "dd MMM yyyy");
  } catch {
    return dateStr;
  }
};

const formatCurrency = (amount?: number) => {
  if (amount === undefined || amount === null) return "—";
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

function getContractStatus(contract?: { endDate?: string; isExpired?: boolean }) {
  if (!contract) return null;

  if (contract.isExpired) {
    return { label: "Expired", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", dotClassName: "bg-red-500" };
  }

  if (!contract.endDate) {
    return { label: "Active", className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", dotClassName: "bg-green-500" };
  }

  const daysLeft = differenceInCalendarDays(parseISO(contract.endDate), new Date());

  if (daysLeft < 0) {
    return {
      label: `Expired ${Math.abs(daysLeft)} day${Math.abs(daysLeft) === 1 ? "" : "s"} ago`,
      className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      dotClassName: "bg-red-500",
    };
  }

  if (daysLeft <= 30) {
    return {
      label: `Expires in ${daysLeft} day${daysLeft === 1 ? "" : "s"} (${formatDate(contract.endDate)})`,
      className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      dotClassName: "bg-yellow-500",
    };
  }

  return { label: "Active", className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", dotClassName: "bg-green-500" };
}

export default function ContractTab({ employee }: Props) {
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [panelMode, setPanelMode] = React.useState<"create" | "renew" | "edit" | null>(null);

  const contract = employee.contract;
  const status = getContractStatus(contract);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground">Current Contract</h3>
        {status && (
          <Badge className={`font-normal shadow-sm gap-1.5 ${status.className}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${status.dotClassName}`} />
            {status.label}
          </Badge>
        )}
      </div>

      {!contract ? (
        <Card>
          <CardContent className="flex flex-col items-center text-center gap-3 py-10">
            <FileSignature className="h-10 w-10 text-muted-foreground/50" />
            <div>
              <p className="font-medium">No contract yet</p>
              <p className="text-sm text-muted-foreground">មិនទាន់មានកិច្ចសន្យា &middot; Set up their pay terms to get started.</p>
            </div>
            <Button type="button" className="mt-1" onClick={() => setPanelMode("create")}>
              + Create New Contract
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-5 space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileSignature className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">
                    {contract.contractType} &middot; Started {formatDate(contract.startDate)}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" />
                    Base salary: {formatCurrency(contract.baseSalary)}/month
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <CalendarClock className="h-3.5 w-3.5" />
                    {contract.endDate ? `Expires: ${formatDate(contract.endDate)}` : "Expires: — (no end date)"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsViewOpen(true)}>
                  View details
                </Button>
                <Button type="button" size="sm" className="gap-1.5" onClick={() => setPanelMode("renew")}>
                  <RefreshCw className="h-3.5 w-3.5" />
                  Renew
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setPanelMode("edit")}>
                  Edit details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      <p className="text-xs text-muted-foreground">
        Looking for older contracts for this person? Check the full list under{" "}
        <span className="font-medium text-foreground">Contracts</span> in the main menu.
      </p>

      <SharedDialog
        setOpen={() => setIsViewOpen(false)}
        open={isViewOpen}
        title="Contract Details"
        isCancel={false}
        width="85%"
        height="95%"
      >
        <ContractView contract={contract} />
      </SharedDialog>

      {panelMode && (
        <ContractPanel
          open={!!panelMode}
          setOpen={(open) => !open && setPanelMode(null)}
          employee={employee}
          editingContract={panelMode === "edit" ? contract : undefined}
          renewFrom={panelMode === "renew" ? contract : undefined}
        />
      )}
    </div>
  );
}

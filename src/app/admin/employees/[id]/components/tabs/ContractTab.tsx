"use client";

import React from "react";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import {
  CalendarClock,
  DollarSign,
  DownloadIcon,
  FileSignature,
  History,
  PenIcon,
  RefreshCw,
  SquarePen,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { RenderView, Section } from "@/components/shared/view/RenderView";
import SharedDialog from "@/components/shared/SharedDialog";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { contractKeys } from "@/service/util/query-keys/contract";
import { IEmployee } from "@/types/admin/employee";
import { IContract } from "@/types/admin/contract";
import ContractView from "@/app/admin/contracts/components/view/ContractView";
import ContractPanel from "./ContractPanel";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { contractColumns } from "./contractColumns";
import { useDataTableDetail } from "@/hooks/use-data-detail-table";
import { ButtonGroup } from "@/components/ui/button-group";

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
    return {
      label: "Expired",
      className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      dotClassName: "bg-red-500",
    };
  }

  if (!contract.endDate) {
    return {
      label: "Active",
      className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      dotClassName: "bg-green-500",
    };
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

  return {
    label: "Active",
    className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    dotClassName: "bg-green-500",
  };
}

function getHistoryStatusBadge(contract: IContract) {
  if (contract.isExpired || contract.status?.toUpperCase() === "EXPIRED") {
    return { label: "Expired", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" };
  }
  if (contract.status?.toUpperCase() === "INACTIVE") {
    return { label: "Inactive", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" };
  }
  return {
    label: contract.status || "Ended",
    className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  };
}

export default function ContractTab({ employee }: Props) {
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [historyView, setHistoryView] = React.useState<IContract | null>(null);
  const [panelMode, setPanelMode] = React.useState<"create" | "renew" | "edit" | null>(null);

  const contract = employee?.activeContract;
  const { data: historyData, isFetching: isLoadingHistory } = useQueryShared({
    url: `/v1/contracts/history/employee/${employee.id}`,
    key: `${contractKeys.list_contract}_employee_${employee.id}`,
    enable: !!employee.id,
  });

  const { table: subTable } = useDataTableDetail({
    columns: contractColumns([]),
    queryData: historyData?.data ?? [],
  });

  return (
    <div className="space-y-6">
      {!contract ? (
        <Card>
          <CardContent className="flex flex-col items-center text-center gap-3 py-10">
            <FileSignature className="h-10 w-10 text-muted-foreground/50" />
            <div>
              <p className="font-medium">No contract yet</p>
              <p className="text-sm text-muted-foreground">
                មិនទាន់មានកិច្ចសន្យា &middot; Set up their pay terms to get started.
              </p>
            </div>
            <Button type="button" className="mt-1" onClick={() => setPanelMode("create")}>
              + Create New Contract
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="flex justify-end gap-2">
            <Button className="flex items-center" size={"sm"} onClick={() => setPanelMode("edit")}>
              <SquarePen className="size-4 mr-2" /> Edit
            </Button>
            <Button className="flex items-center" size={"sm"}>
              <DownloadIcon className="size-4 mr-2" /> Download
            </Button>
          </div>
          <Section title="Contract Information">
            <RenderView
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              fields={[
                { label: "Contract Type", value: contract.contractType },
                { label: "Status", value: contract.status },
                { label: "Start Date", value: formatDate(contract.startDate) },
                { label: "End Date", value: formatDate(contract.endDate) },
                { label: "Signed Date", value: formatDate(contract.signedDate ?? undefined) },
              ]}
            />
          </Section>

          <Section title="Compensation" icon={<DollarSign className="h-4 w-4" />}>
            <RenderView
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              fields={[
                { label: "Base Salary", value: formatCurrency(contract.baseSalary) },
                { label: "Daily Rate", value: formatCurrency(contract.dailyRate) },
                { label: "Hourly Rate", value: formatCurrency(contract.hourlyRate) },
                { label: "OT Rate (Normal)", value: formatCurrency(contract.otRateNormal) },
                { label: "OT Rate (Excess)", value: formatCurrency(contract.otRateExcess) },
              ]}
            />
          </Section>

          <Section title="Allowances">
            <RenderView
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              fields={[
                { label: "Food / Day", value: formatCurrency(contract.allowanceFoodPerDay) },
                { label: "Female Lunch / Day", value: formatCurrency(contract.allowanceFemaleLunchPerDay) },
                { label: "Milk (Monthly)", value: formatCurrency(contract.allowanceMilkMonthly) },
                { label: "Housing", value: formatCurrency(contract.allowanceHousing) },
                { label: "Transport", value: formatCurrency(contract.allowanceTransport) },
                { label: "OT Food / Hour", value: formatCurrency(contract.allowanceOtFoodPerHour) },
                { label: "Union Fee (Monthly)", value: formatCurrency(contract.allowanceUnionFeeMonthly) },
                { label: "Skill", value: formatCurrency(contract.allowanceSkill) },
              ]}
            />
          </Section>

          <Section title="Bonuses & Skill" icon={<TrendingUp className="h-4 w-4" />}>
            <RenderView
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              fields={[
                { label: "Skill Level", value: contract.skillLevel },
                { label: "Attendance Bonus", value: formatCurrency(contract.bonusAttendance) },
                { label: "Position Bonus", value: formatCurrency(contract.bonusPosition) },
                { label: "Technical Bonus", value: formatCurrency(contract.bonusTechnical) },
              ]}
            />
          </Section>
        </div>
      )}

      <Separator />

      <Section icon={<History />} title="Contract History">
        <BaseDataTable table={subTable} isPage={false}></BaseDataTable>
      </Section>

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

      <SharedDialog
        setOpen={() => setHistoryView(null)}
        open={!!historyView}
        title="Contract Details"
        isCancel={false}
        width="85%"
        height="95%"
      >
        <ContractView contract={historyView ?? undefined} />
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

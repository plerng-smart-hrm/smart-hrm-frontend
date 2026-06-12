"use client";
import { useState } from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { DownloadIcon, PenIcon, PlusIcon } from "lucide-react";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import SharedDialog from "@/components/shared/SharedDialog";
import RunPayrollForm from "./form/RunPayrollForm";
import { payrollReportColumns } from "../../payroll-reports/components/columns";
import { IPayrollReport } from "@/types/admin/payroll-report";
import { useMutatePayrollReport } from "@/stores/admin/useMutatePayrollReport";
import { toast } from "sonner";

const PayrollClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<"FIRST_PAYMENT" | "SECOND_PAYMENT" | null>(null);

  const { downloadPayrollReportExcel } = useMutatePayrollReport();
  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IPayrollReport) => {},
    },
    {
      name: "Download Excel",
      icon: DownloadIcon,
      event: async (value: IPayrollReport) => {
        const controller = new AbortController();

        const toastId = toast.loading("Downloading Excel...", {
          action: {
            label: "Cancel",
            onClick: () => {
              controller.abort();
            },
          },
        });

        try {
          await downloadPayrollReportExcel({
            id: value.id,
            signal: controller.signal,
          });
          toast.success("Download completed", {
            id: toastId,
          });
        } catch {
          toast.error("Failed to download payroll report", {
            id: toastId,
          });
        }
      },
    },
  ];

  const { table } = useDataTable({
    columns: payrollReportColumns(actionButton),
  });

  const openDialog = (type: "FIRST_PAYMENT" | "SECOND_PAYMENT") => {
    setPaymentType(type);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setPaymentType(null);
  };

  return (
    <div>
      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions
            actions={[
              {
                name: "Run Advance",
                icon: PlusIcon,
                variant: "default",
                event: () => openDialog("FIRST_PAYMENT"),
              },
              {
                name: "Run Final",
                icon: PlusIcon,
                variant: "success",
                event: () => openDialog("SECOND_PAYMENT"),
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        setOpen={handleClose}
        open={isOpen}
        title={paymentType === "FIRST_PAYMENT" ? "Run Advance Payroll" : "Run Final Payroll"}
        isCancel={false}
        width="50%"
      >
        {paymentType && <RunPayrollForm type={paymentType} onSuccess={handleClose} />}
      </SharedDialog>
    </div>
  );
};

export default PayrollClient;

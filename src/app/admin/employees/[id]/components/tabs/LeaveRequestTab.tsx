"use client";

import React from "react";
import { History, TrashIcon } from "lucide-react";
import { Section } from "@/components/shared/view/RenderView";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { IEmployee } from "@/types/admin/employee";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { useDataTableDetail } from "@/hooks/use-data-detail-table";
import SharedDialog from "@/components/shared/SharedDialog";

import { leaveRequestKeys } from "@/service/util/query-keys/leave-request";
import { ILeaveRequest } from "@/types/admin/leave-request";
import { leaveRequestColumns } from "../leaveRequestColumns";
import LeaveBalanceCard from "../LeaveBalanceCard";
import { leaveBalanceKeys } from "@/service/util/query-keys/leave-balance";
import { useMutateLeaveRequest } from "@/stores/admin/useMutateLeaveRequest";
import FullScreenLoading from "@/components/shared/fullscreen-loading";

interface Props {
  employee: IEmployee;
}

export default function LeaveRequestTab({ employee }: Props) {
  const [isDelete, setIsDelete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedLeaveRequest, setSelectLeaveRequest] = React.useState<ILeaveRequest | undefined>(undefined);

  const { data: leaveRequestData } = useQueryShared({
    url: `/v1/leave-requests/employee/${employee.id}`,
    key: `${leaveRequestKeys.list_leave_request}_employee_${employee.id}`,
    enable: !!employee.id,
  });

  const { data: leaveBalanceData } = useQueryShared({
    url: `/v1/leave-balances/employee/${employee.id}`,
    key: `${leaveBalanceKeys.list_leave_balance}_employee_${employee.id}`,
    enable: !!employee.id,
  });

  const { deleteLeaveRequest } = useMutateLeaveRequest();

  const actionButton = [
    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: ILeaveRequest) => {
        setSelectLeaveRequest(value);
        setIsDelete(true);
      },
    },
  ];

  const handleDelete = async () => {
    setIsLoading(true);

    deleteLeaveRequest(
      { leaveRequestId: selectedLeaveRequest?.id, employeeId: employee.id },
      {
        onSuccess: () => {
          setIsLoading(false);
          setIsDelete(false);
        },
      },
    );
  };

  const { table: subTable } = useDataTableDetail({
    columns: leaveRequestColumns(actionButton),
    queryData: leaveRequestData?.data ?? [],
  });

  if (isLoading) return <FullScreenLoading />;
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <Section icon={<History />} title="LeaveRequest">
            <BaseDataTable table={subTable} isPage={false} />
          </Section>
        </div>

        <div className="lg:col-span-3">
          <LeaveBalanceCard
            leaveBalance={leaveBalanceData?.data ?? undefined}
            leaveRequests={leaveRequestData?.data ?? []}
          />
        </div>
      </div>

      <SharedDialog
        title={"Delete LeaveRequest"}
        setOpen={setIsDelete}
        open={isDelete}
        submitEvent={handleDelete}
        isSubmit
        submitTitle="Yes, Delete"
        className="bg-red-500"
        width="40%"
      >
        <p>
          This will delete <span className="font-bold">{selectedLeaveRequest?.leaveType}</span>
        </p>
      </SharedDialog>
    </div>
  );
}

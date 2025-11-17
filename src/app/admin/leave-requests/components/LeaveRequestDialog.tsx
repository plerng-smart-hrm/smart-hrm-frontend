"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LeaveRequestForm from "./LeaveRequestForm";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getLeaveRequestById } from "@/service/admin/leave-requests.service";
import { getLeaveTypeList } from "@/service/admin/leave-types.service";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  leaveRequestId?: number;
}
const LeaveRequestDialog = ({ isOpen, setIsOpen, leaveRequestId }: Props) => {
  const isEdit = !!leaveRequestId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.categories.byId(leaveRequestId),
    queryFn: () => getLeaveRequestById(leaveRequestId),
    enabled: isEdit,
  });

  const { data: leaveTypeData, isFetching: isFetchingLeaveType } = useQuery({
    queryKey: queryKeys.leaveRequests.list(),
    queryFn: () => getLeaveTypeList(),
  });

  const leaveRequest = data?.leaveRequest ?? undefined;
  const leaveTypeList = leaveTypeData?.leaveTypes ?? [];

  if (isFetching && isFetchingLeaveType) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Leave Request" : "Create Leave Request"}
          </DialogTitle>
        </DialogHeader>
        <LeaveRequestForm
          initialData={leaveRequest}
          leaveTypes={leaveTypeList}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LeaveRequestDialog;

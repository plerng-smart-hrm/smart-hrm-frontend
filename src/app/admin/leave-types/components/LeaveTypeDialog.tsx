"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LeaveTypeForm from "./LeaveTypeForm";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getLeaveTypeById } from "@/service/admin/leave-types.service";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  leaveTypeId?: number;
}
const LeaveTypeDialog = ({ isOpen, setIsOpen, leaveTypeId }: Props) => {
  const isEdit = !!leaveTypeId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.categories.byId(leaveTypeId),
    queryFn: () => getLeaveTypeById(leaveTypeId),
    enabled: isEdit,
  });

  const leaveType = data?.leaveType ?? undefined;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Leave Type" : "Create Leave Type"}
          </DialogTitle>
        </DialogHeader>
        <LeaveTypeForm
          initialData={leaveType}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LeaveTypeDialog;

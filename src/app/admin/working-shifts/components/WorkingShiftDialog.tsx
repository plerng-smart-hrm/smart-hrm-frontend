"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getWorkingShiftById } from "@/service/admin/working-shifts.service";
import WorkingShiftForm from "./WorkingShiftForm";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  workingShiftId?: number;
}
const WorkingShiftDialog = ({ isOpen, setIsOpen, workingShiftId }: Props) => {
  const isEdit = !!workingShiftId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.workingShifts.detail(workingShiftId),
    queryFn: () => getWorkingShiftById(workingShiftId),
    enabled: isEdit,
  });

  const workingShift = data?.workingShift ?? undefined;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit WorkingShift" : "Create WorkingShift"}
          </DialogTitle>
        </DialogHeader>
        <WorkingShiftForm
          initialData={workingShift}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WorkingShiftDialog;

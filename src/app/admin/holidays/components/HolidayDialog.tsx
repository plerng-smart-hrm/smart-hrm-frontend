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
import { getHolidayById } from "@/service/admin/holiday.service";
import HolidayForm from "./HolidayForm";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  holidayId?: number;
}
const HolidayDialog = ({ isOpen, setIsOpen, holidayId }: Props) => {
  const isEdit = !!holidayId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.holidays.detail(holidayId),
    queryFn: () => getHolidayById(holidayId),
    enabled: isEdit,
  });

  const holiday = data?.holiday ?? undefined;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Holiday" : "Create Holiday"}
          </DialogTitle>
        </DialogHeader>
        <HolidayForm initialData={holiday} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default HolidayDialog;

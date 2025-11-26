import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import HealthCheckForm from "../forms/HealthCheckForm";
import { IHealthCheck } from "@/types/admin";

interface Props {
  open: boolean;
  onClose: () => void;
  employeeId?: number;
  initialData?: IHealthCheck | null;
}

const HealthCheckDialog = ({
  open,
  onClose,
  employeeId,
  initialData = null,
}: Props) => {
  const isEdit = !!initialData?.id;
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Health Check" : "Add Health Check"}
          </DialogTitle>
        </DialogHeader>

        <HealthCheckForm
          onClose={onClose}
          employeeId={employeeId}
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default HealthCheckDialog;

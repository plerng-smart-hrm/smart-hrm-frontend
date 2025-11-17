"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DepartmentForm from "./DepartmentForm";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getDepartmentById } from "@/service/admin/departments.service";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  departmentId?: number;
}
const DepartmentDialog = ({ isOpen, setIsOpen, departmentId }: Props) => {
  const isEdit = !!departmentId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.categories.byId(departmentId),
    queryFn: () => getDepartmentById(departmentId),
    enabled: isEdit,
  });

  const department = data?.department ?? undefined;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Department" : "Create Department"}
          </DialogTitle>
        </DialogHeader>
        <DepartmentForm
          initialData={department}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentDialog;

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SectionForm from "./SectionForm";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getSectionById } from "@/service/admin/sections.service";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  sectionId?: number;
}
const SectionDialog = ({ isOpen, setIsOpen, sectionId }: Props) => {
  const isEdit = !!sectionId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.categories.byId(sectionId),
    queryFn: () => getSectionById(sectionId),
    enabled: isEdit,
  });

  const section = data?.section ?? undefined;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Section" : "Create Section"}
          </DialogTitle>
        </DialogHeader>
        <SectionForm initialData={section} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default SectionDialog;

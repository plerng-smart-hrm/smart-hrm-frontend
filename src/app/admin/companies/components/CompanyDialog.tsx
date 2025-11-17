"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CompanyForm from "./CompanyForm";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getCompanyById } from "@/service/admin/companies.service";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  companyId?: number;
}
const CompanyDialog = ({ isOpen, setIsOpen, companyId }: Props) => {
  const isEdit = !!companyId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.categories.byId(companyId),
    queryFn: () => getCompanyById(companyId),
    enabled: isEdit,
  });

  const company = data?.company ?? undefined;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Company" : "Create Company"}
          </DialogTitle>
        </DialogHeader>
        <CompanyForm initialData={company} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDialog;

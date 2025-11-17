"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ContractTypeForm from "./CompanyForm";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getContractTypeById } from "@/service/admin/contract-types.service";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contractTypeId?: number;
}
const ContractTypeDialog = ({ isOpen, setIsOpen, contractTypeId }: Props) => {
  const isEdit = !!contractTypeId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.categories.byId(contractTypeId),
    queryFn: () => getContractTypeById(contractTypeId),
    enabled: isEdit,
  });

  const contractType = data?.contractType ?? undefined;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit ContractType" : "Create ContractType"}
          </DialogTitle>
        </DialogHeader>
        <ContractTypeForm
          initialData={contractType}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContractTypeDialog;

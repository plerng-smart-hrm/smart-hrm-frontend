"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ContractForm from "./ContractForm";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getContractById } from "@/service/admin/contracts.service";
import { getAllContractTypeList } from "@/service/admin/contract-types.service";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contractId?: number;
}
const ContractDialog = ({ isOpen, setIsOpen, contractId }: Props) => {
  const isEdit = !!contractId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.contracts.detail(contractId),
    queryFn: () => getContractById(contractId),
    enabled: isEdit,
  });

  const { data: contractTypeData, isFetching: isFetchingContractType } =
    useQuery({
      queryKey: queryKeys.contractTypes.list(),
      queryFn: () => getAllContractTypeList(),
    });

  const contract = data?.contract ?? undefined;
  const contractTypes = contractTypeData?.contractTypes ?? [];

  if (isFetching && isFetchingContractType) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Contract" : "Create Contract"}
          </DialogTitle>
        </DialogHeader>
        <ContractForm
          initialData={contract}
          onSuccess={() => setIsOpen(false)}
          contractTypes={contractTypes}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContractDialog;

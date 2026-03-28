import ContractClient from "./components/ContractClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { contractKeys } from "@/service/util/query-keys/contract";

interface Props {
  searchParams: Promise<{
    pageIndex?: string;
    pageSize?: string;
  }>;
}

const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Contracts"}>
      <ContentWrapper queryKey={contractKeys.list_contract}>
        <ContractClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

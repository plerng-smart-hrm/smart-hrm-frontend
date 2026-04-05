import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { companyKeys } from "@/service/util/query-keys/company";
import CompanyClient from "./components/CompanyClient";

interface Props {
  searchParams: Promise<{
    pageIndex?: string;
    pageSize?: string;
  }>;
}


const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Companies"}>
      <ContentWrapper queryKey={companyKeys.list_company}>
        <CompanyClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

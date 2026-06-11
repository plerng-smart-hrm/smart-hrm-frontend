import ContractClient from "./components/PayrollReportClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { contractKeys } from "@/service/util/query-keys/contract";
import { payrollReportKeys } from "@/service/util/query-keys/payroll-report";

interface Props {
  searchParams: Promise<{
    pageIndex?: string;
    pageSize?: string;
  }>;
}

const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Payrolls"}>
      <ContentWrapper queryKey={payrollReportKeys.list_payroll_report}>
        <ContractClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

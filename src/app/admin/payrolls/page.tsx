import PayrollClient from "./components/PayrollClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { payrollKeys } from "@/service/util/query-keys/payroll";
import { payrollReportKeys } from "@/service/util/query-keys/payroll-report";

const page = async () => {
  return (
    <ContentLayout title={"Payroll Overview"}>
      <ContentWrapper queryKey={payrollReportKeys.list_payroll_report}>
        <PayrollClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

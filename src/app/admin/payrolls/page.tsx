import PayrollClient from "./components/PayrollClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { payrollKeys } from "@/service/util/query-keys/payroll";

const page = async () => {
  return (
    <ContentLayout title={"Payrolls"}>
      <ContentWrapper queryKey={payrollKeys.list_payroll}>
        <PayrollClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

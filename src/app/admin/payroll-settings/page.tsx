import PayrollClient from "./components/PayrollClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { payrollSettingSchema } from "@/schemas/admin/payroll-setting";
import { payrollKeys } from "@/service/util/query-keys/payroll";

const page = async () => {
  return (
    <ContentLayout title={"Payroll Setting"}>
      <ContentWrapper>
        <PayrollClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

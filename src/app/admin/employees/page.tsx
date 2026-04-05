import { ContentLayout } from "@/components/admin-panel/content-layout";
import EmployeeClient from "./components/EmployeeClient";
import ContentWrapper from "@/components/content/content-wrapper";
import { employeeKeys } from "@/service/util/query-keys/employee";

const page = async () => {
  return (
    <ContentLayout title={"Employee"}>
      <ContentWrapper queryKey={employeeKeys.list_employee}>
        <EmployeeClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

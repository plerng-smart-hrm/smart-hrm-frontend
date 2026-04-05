import DepartmentClient from "./components/DepartmentClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { departmentKeys } from "@/service/util/query-keys/department";

const page = async () => {
  return (
    <ContentLayout title={"Daily Attendance"}>
      <ContentWrapper queryKey={departmentKeys.list_department}>
        <DepartmentClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

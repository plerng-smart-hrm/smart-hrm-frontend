import { ContentLayout } from "@/components/admin-panel/content-layout";
import NewEmployeeClient from "./components/NewEmployeeClient";
import ContentWrapper from "@/components/content/content-wrapper";

const page = () => {
  return (
    <ContentLayout title="Add Employee" backHref="/admin/employees">
      <ContentWrapper>
        <NewEmployeeClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

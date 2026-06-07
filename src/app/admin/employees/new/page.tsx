import { ContentLayout } from "@/components/admin-panel/content-layout";
import NewEmployeeClient from "./components/NewEmployeeClient";

const page = () => {
  return (
    <ContentLayout title="Add Employee" backHref="/admin/employees">
      <NewEmployeeClient />
    </ContentLayout>
  );
};

export default page;

import EmployeeProfileClient from "./components/EmployeeProfileClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";

interface Props {
  params?: Promise<{ id?: string }>;
}

const page = async ({ params }: Props) => {
  const id = (await params)?.id ?? "";

  return (
    <ContentLayout title={"Employee Detail"}>
      <ContentWrapper>
        <EmployeeProfileClient employeeId={id} />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

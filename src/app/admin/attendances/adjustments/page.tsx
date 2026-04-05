import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { attAdjustmentKeys } from "@/service/util/query-keys/att-adjustment";
import AttAdjustmentClient from "./components/AttAdjustmentClient";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Attendance Adjustment"}>
      <ContentWrapper queryKey={attAdjustmentKeys.list_att_adjustment}>
        <AttAdjustmentClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

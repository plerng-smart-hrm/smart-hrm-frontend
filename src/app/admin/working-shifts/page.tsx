import WorkingShiftClient from "./components/WorkingShiftClient";
import { workingShiftKeys } from "@/service/util/query-keys/working-shift";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";

const page = async () => {
  return (
    <ContentLayout title={"Working Shifts"}>
      <ContentWrapper queryKey={workingShiftKeys.list_working_shift}>
        <WorkingShiftClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

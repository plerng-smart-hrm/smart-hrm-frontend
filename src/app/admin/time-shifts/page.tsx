import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { timeShiftKeys } from "@/service/util/query-keys/time-shift";
import TimeShiftClient from "./components/TimeShiftClient";

const page = async () => {
  return (
    <ContentLayout title={"Working Shifts"}>
      <ContentWrapper queryKey={timeShiftKeys.list_time_shift}>
        <TimeShiftClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

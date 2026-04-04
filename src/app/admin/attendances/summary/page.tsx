import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import AttendanceSummaryClient from "./components/AttendanceSummaryClient";
import { attendanceSummaryKeys } from "@/service/util/query-keys/attendance-summary";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Attendance Summary"}>
      <ContentWrapper queryKey={attendanceSummaryKeys.list_attendance_summary}>
        <AttendanceSummaryClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

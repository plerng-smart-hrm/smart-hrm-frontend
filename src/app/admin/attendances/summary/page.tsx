import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { attendanceKeys } from "@/service/util/query-keys/attendance";
import AttendanceSummaryClient from "./components/AttendanceSummaryClient";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Attendance Summary"}>
      <ContentWrapper queryKey={attendanceKeys.list_attendance_summary}>
        <AttendanceSummaryClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import LogsClient from "./components/LogsClient";
import { attendanceLogKeys } from "@/service/util/query-keys/attendance-log";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Attendance Logs"}>
      <ContentWrapper queryKey={attendanceLogKeys.list_attendance_log}>
        <LogsClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

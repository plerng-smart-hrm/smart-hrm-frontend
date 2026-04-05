import { ContentLayout } from "@/components/admin-panel/content-layout";
import AttendanceDetailClient from "./components/AttendanceDetailClient";

const page = () => {
  return (
    <ContentLayout title="Attendance Detail">
      <AttendanceDetailClient />
    </ContentLayout>
  );
};

export default page;

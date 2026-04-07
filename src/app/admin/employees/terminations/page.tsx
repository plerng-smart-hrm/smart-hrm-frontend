import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { employeeKeys } from "@/service/util/query-keys/employee";
import { terminationKeys } from "@/service/util/query-keys/termination";
import TerminationClient from "./components/TerminationClient";

const page = async () => {
  return (
    <ContentLayout title={"Termination"}>
      <ContentWrapper queryKey={terminationKeys.list_termination}>
        <TerminationClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

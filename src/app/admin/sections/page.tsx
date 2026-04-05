import SectionClient from "./components/SectionClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { sectionKeys } from "@/service/util/query-keys/section";

interface Props {
  searchParams: Promise<{
    pageIndex?: string;
    pageSize?: string;
  }>;
}

const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Sections"}>
      <ContentWrapper queryKey={sectionKeys.list_section}>
        <SectionClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

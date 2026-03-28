import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSearchParams } from "@/utils/searchParams";
import SectionClient from "./components/SectionClient";
import { getAllSections } from "@/service/admin/sections.service";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { employeeKeys } from "@/service/util/query-keys/employee";
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

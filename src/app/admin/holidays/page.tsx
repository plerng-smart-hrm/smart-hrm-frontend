import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import HolidayClient from "./components/HolidayClient";
import { getSearchParams } from "@/utils/searchParams";
import { getAllHolidays } from "@/service/admin/holiday.service";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { employeeKeys } from "@/service/util/query-keys/employee";
import { holidayKeys } from "@/service/util/query-keys/holiday";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Holidays"}>
      <ContentWrapper queryKey={holidayKeys.list_holiday}>
        <HolidayClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

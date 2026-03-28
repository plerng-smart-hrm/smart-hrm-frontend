import DeviceClient from "./components/DeviceClient";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import { deviceKeys } from "@/service/util/query-keys/device";

interface Props {
  searchParams: Promise<{
    pageIndex?: string;
    pageSize?: string;
  }>;
}

const page = async ({}: Props) => {
  return (
    <ContentLayout title={"Devices"}>
      <ContentWrapper queryKey={deviceKeys.list_device}>
        <DeviceClient />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default page;

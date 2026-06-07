import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { getQueryClient } from "@/lib/query-client";
import { getEmployeeById } from "@/service/admin/employees.service";
import { employeeDetailKey } from "@/service/util/query-keys/employee";
import EditEmployeeClient from "./components/EditEmployeeClient";

interface Props {
  params?: Promise<{ id?: string }>;
}

const page = async ({ params }: Props) => {
  const id = (await params)?.id ?? "";
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: employeeDetailKey(Number(id)),
    queryFn: () => getEmployeeById(Number(id)),
  });

  return (
    <ContentLayout title="Update Employee" backHref={`/admin/employees/${id}`}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditEmployeeClient employeeId={id} />
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default page;

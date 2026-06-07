import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { getEmployeeById } from "@/service/admin/employees.service";
import { employeeDetailKey } from "@/service/util/query-keys/employee";
import EmployeeProfileClient from "./components/EmployeeProfileClient";

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeeProfileClient employeeId={id} />
    </HydrationBoundary>
  );
};

export default page;

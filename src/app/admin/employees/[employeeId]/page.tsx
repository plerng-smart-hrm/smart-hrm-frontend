import { getQueryClient } from "@/lib/query-client";
import { getEmployeeById } from "@/service/admin/employees.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import EmployeeIdClient from "./components/EmployeeIdClient";
import { queryKeys } from "@/service/util/query-keys/employee";
interface Props {
  params?: Promise<{ employeeId?: string }>;
}
const page = async ({ params }: Props) => {
  const employeeId = (await params)?.employeeId ?? "";
  const queryClient = getQueryClient();

  if (employeeId && employeeId !== "new") {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.employees.detail(Number(employeeId)),
      queryFn: () => getEmployeeById(Number(employeeId)),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeeIdClient employeeId={employeeId} />
    </HydrationBoundary>
  );
};

export default page;

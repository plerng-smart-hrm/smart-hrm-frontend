import { getQueryClient } from "@/lib/query-client";
import { getEmployeeById } from "@/service/admin/employees.service";
import { queryKeys } from "@/service/util/query-key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import EmployeeIdClient from "./components/EmployeeIdClient";
import { getAllHealthCheckByEmployeeId } from "@/service/admin/health-check.service";
import { getAllMaternityByEmployeeId } from "@/service/admin/maternity.service";
import { getAllVaccineByEmployeeId } from "@/service/admin/vaccine.service";
import { getAllWarningByEmployeeId } from "@/service/admin/warning.service";
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

    await queryClient.prefetchQuery({
      queryKey: queryKeys.healthChecks.detail(Number(employeeId)),
      queryFn: () => getAllHealthCheckByEmployeeId(Number(employeeId)),
    });

    await queryClient.prefetchQuery({
      queryKey: queryKeys.maternities.detail(Number(employeeId)),
      queryFn: () => getAllMaternityByEmployeeId(Number(employeeId)),
    });

    await queryClient.prefetchQuery({
      queryKey: queryKeys.vaccines.detail(Number(employeeId)),
      queryFn: () => getAllVaccineByEmployeeId(Number(employeeId)),
    });

    await queryClient.prefetchQuery({
      queryKey: queryKeys.warnings.detail(Number(employeeId)),
      queryFn: () => getAllWarningByEmployeeId(Number(employeeId)),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeeIdClient employeeId={employeeId} />
    </HydrationBoundary>
  );
};

export default page;

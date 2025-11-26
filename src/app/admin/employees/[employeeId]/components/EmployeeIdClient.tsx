"use client";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getEmployeeById } from "@/service/admin/employees.service";
import Heading from "@/components/Heading";
import { SaveIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EmployeeForm from "./EmployeeForm";
import { LoadingButton } from "@/components/LoadingButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HealthMedicalSection from "./HealthMedical";
import { getAllHealthCheckByEmployeeId } from "@/service/admin/health-check.service";
import { getAllMaternityByEmployeeId } from "@/service/admin/maternity.service";
import { getAllVaccineByEmployeeId } from "@/service/admin/vaccine.service";
import { getAllWarningByEmployeeId } from "@/service/admin/warning.service";

interface Props {
  employeeId?: string;
}
const EmployeeIdClient = ({ employeeId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.employees.detail(Number(employeeId)),
    queryFn: () => getEmployeeById(Number(employeeId)),
    enabled: !!employeeId && employeeId !== "new",
  });

  const { data: dataHealthChecks, isFetching: isFetchingHealthCheck } =
    useQuery({
      queryKey: queryKeys.healthChecks.detail(Number(employeeId)),
      queryFn: () => getAllHealthCheckByEmployeeId(Number(employeeId)),
      enabled: !!employeeId && employeeId !== "new",
    });

  const { data: dataMaternities, isFetching: isFetchingMaternities } = useQuery(
    {
      queryKey: queryKeys.maternities.detail(Number(employeeId)),
      queryFn: () => getAllMaternityByEmployeeId(Number(employeeId)),
      enabled: !!employeeId && employeeId !== "new",
    }
  );

  const { data: dataVaccines, isFetching: isFetchingVaccines } = useQuery({
    queryKey: queryKeys.vaccines.detail(Number(employeeId)),
    queryFn: () => getAllVaccineByEmployeeId(Number(employeeId)),
    enabled: !!employeeId && employeeId !== "new",
  });

  const { data: dataWarnings, isFetching: isFetchingWarnings } = useQuery({
    queryKey: queryKeys.warnings.detail(Number(employeeId)),
    queryFn: () => getAllWarningByEmployeeId(Number(employeeId)),
    enabled: !!employeeId && employeeId !== "new",
  });

  const employee = data?.employee ?? null;
  const formRef = useRef<HTMLFormElement | null>(null);

  const healthChecks = dataHealthChecks?.healthChecks ?? [];
  const maternities = dataMaternities?.maternities ?? [];
  const vaccines = dataVaccines?.vaccines ?? [];
  const warnings = dataWarnings?.warnings ?? [];

  const onSave = async () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };
  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Employee"
          description="Employee details"
          backButtonHref="/admin/employees"
        />
        <div className="flex justify-center items-center">
          <LoadingButton loading={isLoading} onClick={onSave}>
            <SaveIcon className="h-4 w-4" /> Save
          </LoadingButton>
        </div>
      </div>
      <Separator />
      {/* <EmployeeForm
        formRef={formRef}
        setIsLoading={setIsLoading}
        initialData={employee}
      /> */}
      <Tabs defaultValue="employee" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="employee">Employee Information</TabsTrigger>
          <TabsTrigger value="health">Health & Medical</TabsTrigger>
          <TabsTrigger value="warnings">Warnings</TabsTrigger>
        </TabsList>

        <TabsContent value="employee">
          <EmployeeForm
            formRef={formRef}
            setIsLoading={setIsLoading}
            initialData={employee}
          />
        </TabsContent>

        <TabsContent value="health">
          <HealthMedicalSection
            healthChecks={healthChecks}
            vaccines={vaccines}
            maternities={maternities}
            employeeId={Number(employeeId)}
          />
        </TabsContent>

        {/* <TabsContent value="warnings">
        <WarningsSection employeeId={initialData?.id} />
      </TabsContent> */}
      </Tabs>
    </>
  );
};

export default EmployeeIdClient;

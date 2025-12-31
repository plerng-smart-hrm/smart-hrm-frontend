"use client";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getEmployeeById } from "@/service/admin/employees.service";
import Heading from "@/components/Heading";
import { SaveIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EmployeeForm from "./EmployeeForm";
import { LoadingButton } from "@/components/LoadingButton";
import { queryKeys } from "@/service/util/query-keys/employee";

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

  const employee = data?.employee ?? null;
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSave = async () => {
    console.log('on submit')
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
      <EmployeeForm
        formRef={formRef}
        setIsLoading={setIsLoading}
        initialData={employee}
      />
    </>
  );
};

export default EmployeeIdClient;

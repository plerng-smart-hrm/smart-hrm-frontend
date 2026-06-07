"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeOnboardingWizard from "../../components/wizard/EmployeeOnboardingWizard";

export default function NewEmployeeClient() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) router.push("/admin/employees");
  }, [open, router]);

  return <EmployeeOnboardingWizard setOpen={setOpen} />;
}

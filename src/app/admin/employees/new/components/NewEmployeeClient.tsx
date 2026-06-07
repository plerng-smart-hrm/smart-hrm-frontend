"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import EmployeeOnboardingWizard from "../../components/wizard/EmployeeOnboardingWizard";
import { Card, CardContent } from "@/components/ui/card";

export default function NewEmployeeClient() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) router.push("/admin/employees");
  }, [open, router]);

  return (
    <Card className="h-full">
      <CardContent>
        <EmployeeOnboardingWizard setOpen={setOpen} />
      </CardContent>
    </Card>
  );
}

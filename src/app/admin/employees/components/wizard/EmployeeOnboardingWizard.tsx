"use client";

import React from "react";
import { Stepper, WizardStep } from "@/components/shared/wizard/Stepper";
import { useMutateEmployee } from "@/stores/admin/useMutateEmployee";
import { useMutateContract } from "@/stores/admin/useMutateContract";
import { EmployeeValues } from "@/schemas/admin/employee";
import { ContractValues } from "@/schemas/admin/contract";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import JobShiftStep from "./steps/JobShiftStep";
import SalaryContractStep from "./steps/SalaryContractStep";
import ReviewStep from "./steps/ReviewStep";
import { ContractStepValues, JobShiftValues, PersonalInfoValues } from "./wizardSchemas";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const STEPS: WizardStep[] = [
  { title: "Personal Info" },
  { title: "Job & Shift" },
  { title: "Salary & Contract" },
  { title: "Review & Confirm" },
];

export interface WizardData {
  personal?: PersonalInfoValues;
  photoPreview?: string | null;
  job?: JobShiftValues;
  contract?: ContractStepValues;
}

export default function EmployeeOnboardingWizard({ setOpen }: IProps) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<WizardData>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { createEmployee } = useMutateEmployee();
  const { createContract } = useMutateContract();

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleStepClick = (index: number) => setStep(index);

  const handleFinalSubmit = async () => {
    if (!data.personal || !data.job || !data.contract) return;
    setIsSubmitting(true);

    const employeeRequest: EmployeeValues = {
      ...data.personal,
      ...data.job,
    };

    // Contract step's schema is derived directly from contractSchema (see wizardSchemas.ts),
    // so its values already line up with ContractValues — just attach the empCode.
    const contractRequest: ContractValues = {
      empCode: data.personal.empCode,
      ...data.contract,
    };

    await createEmployee(
      { request: employeeRequest },
      {
        onSuccess: async () => {
          await createContract(
            { request: contractRequest },
            {
              onSettled: () => {
                setIsSubmitting(false);
                setOpen(false);
              },
            },
          );
        },
        onError: () => setIsSubmitting(false),
      },
    );
  };

  return (
    <div className="space-y-6 pb-16">
      <Stepper steps={STEPS} currentStep={step} onStepClick={handleStepClick} />

      {step === 0 && (
        <PersonalInfoStep
          defaultValues={data.personal}
          photoPreview={data.photoPreview}
          onNext={(values, photoPreview) => {
            setData((prev) => ({ ...prev, personal: values, photoPreview }));
            goNext();
          }}
          onCancel={() => setOpen(false)}
        />
      )}

      {step === 1 && (
        <JobShiftStep
          defaultValues={data.job}
          onNext={(values) => {
            setData((prev) => ({ ...prev, job: values }));
            goNext();
          }}
          onBack={goBack}
        />
      )}

      {step === 2 && (
        <SalaryContractStep
          defaultValues={data.contract}
          onNext={(values) => {
            setData((prev) => ({ ...prev, contract: values }));
            goNext();
          }}
          onBack={goBack}
        />
      )}

      {step === 3 && (
        <ReviewStep
          data={data}
          onEdit={setStep}
          onBack={goBack}
          onSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import RenderField from "@/components/shared/form/RenderField";
import { showValidationWarning } from "@/utils/form-validation";
import {
  ContractStepValues,
  contractStepDefaults,
  contractStepSchema,
} from "../wizardSchemas";
import { contractStepFields, salaryFields, skillOvertimeFields } from "../wizardFields";

interface IProps {
  defaultValues?: ContractStepValues;
  onNext: (values: ContractStepValues) => void;
  onBack: () => void;
}

export default function SalaryContractStep({ defaultValues, onNext, onBack }: IProps) {
  const [showAllowances, setShowAllowances] = React.useState(false);

  const form = useForm<ContractStepValues>({
    resolver: zodResolver(contractStepSchema),
    defaultValues: defaultValues ?? contractStepDefaults,
    mode: "onChange",
  });

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({
        fields: [...contractStepFields, ...salaryFields, ...skillOvertimeFields],
        errors: form.formState.errors,
      });
      return;
    }
    onNext(form.getValues());
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Let&apos;s set up how they get paid</h3>
          <p className="text-sm text-muted-foreground">
            ប្រាក់ខែ និងកិច្ចសន្យា &middot; This creates their first contract right away — no separate step needed.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium mb-3">Contract basics</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contractStepFields.map((item) => (
              <FormField
                key={item.key}
                control={form.control}
                name={item.key as keyof ContractStepValues}
                render={(field) => <RenderField form={{ ...item, field }} />}
              />
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-medium mb-3">Salary &amp; pay</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="baseSalary"
              render={(field) => <RenderField form={{ ...salaryFields[0], field }} />}
            />
          </div>
        </div>

        <Collapsible open={showAllowances} onOpenChange={setShowAllowances}>
          <CollapsibleTrigger asChild>
            <Button type="button" variant="ghost" className="text-sm gap-1 px-0 hover:bg-transparent">
              <ChevronDown className={`h-4 w-4 transition-transform ${showAllowances ? "rotate-180" : ""}`} />
              {showAllowances ? "Hide allowances & bonuses" : "Allowances & bonuses (optional — add if this role gets them)"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {salaryFields.slice(1).map((item) => (
                <FormField
                  key={item.key}
                  control={form.control}
                  name={item.key as keyof ContractStepValues}
                  render={(field) => <RenderField form={{ ...item, field }} />}
                />
              ))}
            </div>
            <p className="text-sm font-medium">Skill &amp; overtime</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skillOvertimeFields.map((item) => (
                <FormField
                  key={item.key}
                  control={form.control}
                  name={item.key as keyof ContractStepValues}
                  render={(field) => <RenderField form={{ ...item, field }} />}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-between pt-2">
          <Button type="button" variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <Button type="button" onClick={handleNext}>
            Next: Review
          </Button>
        </div>
      </div>
    </Form>
  );
}

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import RenderField from "@/components/shared/form/RenderField";
import { showValidationWarning } from "@/utils/form-validation";
import { JobShiftValues, jobShiftDefaults, jobShiftSchema } from "../wizardSchemas";
import { pickEmployeeFields } from "../wizardFields";
import { TimeShiftCombobox } from "@/components/comboboxes/TimeShiftCombobox";

const coreKeys = ["position", "startDate", "employeeStatus", "workStatus"];
const otherKeys = ["employeeType"];
const moreKeys = ["endDate"];

interface IProps {
  defaultValues?: JobShiftValues;
  onNext: (values: JobShiftValues) => void;
  onBack: () => void;
}

export default function JobShiftStep({ defaultValues, onNext, onBack }: IProps) {
  const [showMore, setShowMore] = React.useState(false);

  const form = useForm<JobShiftValues>({
    resolver: zodResolver(jobShiftSchema),
    defaultValues: defaultValues ?? jobShiftDefaults,
    mode: "onChange",
  });

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({
        fields: [
          ...pickEmployeeFields(coreKeys),
          { label: "Working Shift", key: "workingShiftId", required: true },
          ...pickEmployeeFields(otherKeys),
          ...pickEmployeeFields(moreKeys),
        ],
        errors: form.formState.errors,
      });
      return;
    }
    onNext(form.getValues());
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="timeShiftId"
            render={({ field }) => (
              <FormItem className="grid gap-y-2 w-full">
                <FormLabel className="text-sm">
                  <span className="text-gray-700 dark:text-white">Working Shift</span>
                  <span className="text-red-600 text-sm pl-0.5">*</span>
                </FormLabel>
                <TimeShiftCombobox value={field.value || undefined} onChange={(value) => field.onChange(value ?? 0)} />
              </FormItem>
            )}
          />

          {pickEmployeeFields(coreKeys).map((item) => (
            <FormField
              key={item.key}
              control={form.control}
              name={item.key as keyof JobShiftValues}
              render={(field) => <RenderField form={{ ...item, field }} />}
            />
          ))}
        </div>

        <p className="text-xs text-muted-foreground -mt-2">
          Tip: Work Status defaults to <span className="font-medium">Active</span> — only change it for special cases.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pickEmployeeFields(otherKeys).map((item) => (
            <FormField
              key={item.key}
              control={form.control}
              name={item.key as keyof JobShiftValues}
              render={(field) => <RenderField form={{ ...item, field }} />}
            />
          ))}
        </div>

        <Collapsible open={showMore} onOpenChange={setShowMore}>
          <CollapsibleTrigger asChild>
            <Button type="button" variant="ghost" className="text-sm gap-1 px-0 hover:bg-transparent">
              <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
              {showMore ? "Hide more details" : "More details (optional)"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-xs text-muted-foreground mb-3">Only fill in an end date if this is a fixed-term role.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pickEmployeeFields(moreKeys).map((item) => (
                <FormField
                  key={item.key}
                  control={form.control}
                  name={item.key as keyof JobShiftValues}
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
            Next: Fingerprint
          </Button>
        </div>
      </div>
    </Form>
  );
}

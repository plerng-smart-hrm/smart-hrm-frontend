"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, User } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import RenderField from "@/components/shared/form/RenderField";
import { showValidationWarning } from "@/utils/form-validation";
import { PersonalInfoValues, personalInfoDefaults, personalInfoSchema } from "../wizardSchemas";
import { pickEmployeeFields } from "../wizardFields";

const coreKeys = ["empCode", "firstName", "lastName", "gender", "dateOfBirth"];
const recommendedKeys = ["firstNameKh", "lastNameKh", "phone", "idCardNo"];
const moreKeys = [
  "placeOfBirth",
  "nationality",
  "race",
  "maritalStatus",
  "childrenNumber",
  "currentAddress",
  "education",
  "laborBookNo",
  "nssfRegisterNo",
];

interface IProps {
  defaultValues?: PersonalInfoValues;
  photoPreview?: string | null;
  onNext: (values: PersonalInfoValues, photoPreview: string | null) => void;
  onCancel: () => void;
}

export default function PersonalInfoStep({ defaultValues, photoPreview: initialPhoto, onNext, onCancel }: IProps) {
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(initialPhoto ?? null);
  const [showMore, setShowMore] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: defaultValues ?? personalInfoDefaults,
    mode: "onChange",
  });

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      showValidationWarning({
        fields: [
          ...pickEmployeeFields(coreKeys),
          ...pickEmployeeFields(recommendedKeys),
          ...pickEmployeeFields(moreKeys),
        ],
        errors: form.formState.errors,
      });
      return;
    }
    onNext(form.getValues(), photoPreview);
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div
            onClick={handlePhotoClick}
            className="w-36 h-36 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-gray-50 dark:bg-gray-900 shrink-0"
          >
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <>
                <User className="w-10 h-10 text-gray-400" />
                <span className="text-xs text-gray-500 mt-2 text-center px-2">Click to add a photo (optional)</span>
              </>
            )}
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {pickEmployeeFields(coreKeys).map((item) => (
              <FormField
                key={item.key}
                control={form.control}
                name={item.key as keyof PersonalInfoValues}
                render={(field) => <RenderField form={{ ...item, field }} />}
              />
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-medium mb-3">Recommended — helps with ID cards and contact</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pickEmployeeFields(recommendedKeys).map((item) => (
              <FormField
                key={item.key}
                control={form.control}
                name={item.key as keyof PersonalInfoValues}
                render={(field) => <RenderField form={{ ...item, field }} />}
              />
            ))}
          </div>
        </div>

        <Collapsible open={showMore} onOpenChange={setShowMore}>
          <CollapsibleTrigger asChild>
            <Button type="button" variant="ghost" className="text-sm gap-1 px-0 hover:bg-transparent">
              <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
              {showMore ? "Hide more details" : "More details (optional)"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pickEmployeeFields(moreKeys).map((item) => (
                <FormField
                  key={item.key}
                  control={form.control}
                  name={item.key as keyof PersonalInfoValues}
                  render={(field) => <RenderField form={{ ...item, field }} />}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleNext}>
            Next: Job &amp; Shift
          </Button>
        </div>
      </div>
    </Form>
  );
}

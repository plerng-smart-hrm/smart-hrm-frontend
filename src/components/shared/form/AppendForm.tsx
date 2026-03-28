import React from "react";
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";

import LoadingButton from "@/components/shared/form/LoadingButton";
import { Form, FormField } from "@/components/ui/form";
import { IFormType } from "@/types/helperType";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Trash } from "lucide-react";
import RenderField from "./RenderField";

interface AppendFormProps {
  form: IFormType["form"];
  formControl: UseFormReturn<any>;
  section?: string;
  icon?: React.ElementType;
  className?: string;
  name: any;
}

const AppendForm = ({
  form,
  section,
  icon,
  className,
  name,
  formControl,
}: AppendFormProps) => {
  const [collapseStates, setCollapseStates] = React.useState<boolean[]>([]);
  const { fields, append, remove } = useFieldArray({
    control: formControl.control,
    name,
  });

  useWatch({ control: formControl.control, name });

  const hasAppendedRef = React.useRef(false);

  const ViewIcon = () => {
    if (!icon) return null;

    const Component = icon;
    return <Component />;
  };

  const handleClickAdd = () => {
    const newRows: Record<string, any> = {};
    form.forEach(field => {
      newRows[field.key] = "";
    });
    append(newRows as any);
    setCollapseStates(prev => [...prev, true]);
  };

  React.useEffect(() => {
    if (fields.length > collapseStates.length) {
      const missingStates = Array(fields.length - collapseStates.length).fill(
        true,
      );
      setCollapseStates(prev => [...prev, ...missingStates]);
    } else if (fields.length < collapseStates.length) {
      setCollapseStates(prev => prev.slice(0, fields.length));
    }
  }, [fields.length, collapseStates.length]);

  React.useEffect(() => {
    if (!hasAppendedRef.current && fields.length === 0) {
      const initialRow: Record<string, any> = {};
      form.forEach(field => {
        initialRow[field.key] = "";
      });
      append(initialRow as any);
      setCollapseStates([true]);
      hasAppendedRef.current = true;
    } else if (fields.length > 0) {
      fields.forEach((field, index) => {
        Object.entries(field).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formControl.setValue(`${name}.${index}.${key}`, value, {
              shouldValidate: false,
              shouldDirty: false,
            });
          }
        });
      });
    }
  }, [append, fields, form, formControl, name]);

  const toggleCollapse = (index: number) => {
    setCollapseStates(prev =>
      prev.map((state, i) => (i === index ? !state : state)),
    );
  };

  const handleRemove = (index: number) => {
    if (index !== 0) {
      remove(index);
      setCollapseStates(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <Form {...formControl}>
      {section && (
        <div className="mt-[25px] text-xl font-semibold mb-4 py-4">
          <h1 className="flex">
            <ViewIcon /> {section}
          </h1>
        </div>
      )}
      <div className="w-full space-y-2">
        {fields?.map((_field, index) => {
          const isExpanded = collapseStates[index] ?? true;

          return (
            <div
              className="relative col-span-4 border p-4 rounded-md"
              key={`field-${index}`}
            >
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  type="button"
                  className="flex items-center space-x-1"
                  onClick={() => toggleCollapse(index)}
                >
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                  <span>Item {index + 1}</span>
                </Button>

                <Button
                  variant="ghost"
                  disabled={index === 0}
                  onClick={() => handleRemove(index)}
                  type="button"
                >
                  <Trash className="text-red-600" size={16} />
                </Button>
              </div>

              {isExpanded && (
                <div
                  className={`mt-4 ${className ? className : "grid grid-cols-4 gap-4"}`}
                >
                  {form.map((item, idx) => {
                    return (
                      <div
                        className={`${item?.className ?? "col-span-1"}`}
                        key={`${index}-${item.key}-${idx}`}
                      >
                        <FormField
                          control={formControl?.control}
                          name={`${name}.${index}.${item.key}`}
                          render={field => {
                            return (
                              <RenderField
                                form={{
                                  ...item,
                                  field,
                                }}
                              />
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <div className="col-span-4 flex items-center justify-end">
          <LoadingButton
            label="Add More"
            handleEvent={handleClickAdd}
            variant="ghost"
          />
        </div>
      </div>
    </Form>
  );
};

export default AppendForm;

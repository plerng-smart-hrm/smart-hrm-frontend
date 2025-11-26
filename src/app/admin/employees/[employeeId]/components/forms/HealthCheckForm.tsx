import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { IHealthCheck } from "@/types/admin";
import { LoadingButton } from "@/components/LoadingButton";
import { useState } from "react";
import { useMutateHealthCheck } from "@/stores/admin/useMutateHealthCheck";

const formSchema = z.object({
  name: z.string().min(1, "Health check name is required"),
  checkDate: z.string().min(1, "Check date is required"),
});

interface Props {
  onClose: () => void;
  employeeId?: number;
  initialData?: IHealthCheck | null;
}

const HealthCheckForm = ({ onClose, employeeId, initialData }: Props) => {
  const isEdit = !!initialData;

  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = {
    name: initialData?.name ?? "",
    checkDate: initialData?.checkDate ?? new Date().toISOString().split("T")[0],
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { create: createMutateHealthCheck, update: updateMutateHealthCheck } =
    useMutateHealthCheck();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (isEdit) {
      await updateMutateHealthCheck(
        {
          healthCheckId: initialData.id,
          request: { ...values, employeeId },
        },
        {
          onSuccess: () => {},
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } else {
      await createMutateHealthCheck(
        {
          request: { ...values, employeeId },
        },
        {
          onSuccess: () => {},
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    }

    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="checkDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <LoadingButton loading={isLoading} type="submit">
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default HealthCheckForm;

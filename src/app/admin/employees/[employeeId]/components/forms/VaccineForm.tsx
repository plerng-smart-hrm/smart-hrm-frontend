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

const formSchema = z.object({
  vaccineName: z.string().min(1, "Vaccine name is required"),
  vaccineDate: z.string().min(1, "Vaccine date is required"),
  nextDoseDate: z.string().optional(),
  provider: z.string().optional(),
  notes: z.string().optional(),
});

interface Props {
  onClose: () => void;
  employeeId?: number;
}

const VaccineForm = ({ onClose, employeeId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vaccineName: "",
      vaccineDate: new Date().toISOString().split("T")[0],
      nextDoseDate: "",
      provider: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Vaccine:", { ...values, employeeId });
    toast.success("Vaccine record added successfully");
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="vaccineName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vaccine Name</FormLabel>
                <FormControl>
                  <Input placeholder="COVID-19, Flu, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider</FormLabel>
                <FormControl>
                  <Input placeholder="Clinic/Hospital name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vaccineDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vaccine Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextDoseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Dose Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Vaccine</Button>
        </div>
      </form>
    </Form>
  );
};

export default VaccineForm;

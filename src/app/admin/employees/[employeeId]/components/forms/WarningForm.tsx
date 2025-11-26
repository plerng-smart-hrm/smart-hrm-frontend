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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  warningType: z.enum(["VERBAL", "WRITTEN", "FINAL", "SUSPENSION"]),
  issueDate: z.string().min(1, "Issue date is required"),
  reason: z.string().min(1, "Reason is required"),
  description: z.string().min(1, "Description is required"),
  issuedBy: z.string().optional(),
});

interface Props {
  onClose: () => void;
  employeeId?: number;
}

const WarningForm = ({ onClose, employeeId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warningType: "VERBAL",
      issueDate: new Date().toISOString().split("T")[0],
      reason: "",
      description: "",
      issuedBy: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Warning:", { ...values, employeeId });
    toast.success("Warning record added successfully");
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="warningType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warning Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="VERBAL">Verbal Warning</SelectItem>
                    <SelectItem value="WRITTEN">Written Warning</SelectItem>
                    <SelectItem value="FINAL">Final Warning</SelectItem>
                    <SelectItem value="SUSPENSION">Suspension</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Date</FormLabel>
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
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input
                  placeholder="Late arrival, misconduct, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of the incident..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="issuedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issued By</FormLabel>
              <FormControl>
                <Input placeholder="Manager name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Warning</Button>
        </div>
      </form>
    </Form>
  );
};

export default WarningForm;

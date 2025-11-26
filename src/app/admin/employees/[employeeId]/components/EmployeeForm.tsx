import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { User } from "lucide-react";
import { IEmployee } from "@/types/admin";
import { useMutateEmployee } from "@/stores/admin/useMutateEmployee";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/format";

const formSchema = z.object({
  empCode: z.string().min(1, "Employee code is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  firstNameKh: z.string().optional(),
  lastNameKh: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  placeOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  race: z.string().optional(),
  maritalStatus: z.string().optional(),
  childrenNumber: z.number().optional(),
  phone: z.string().optional(),
  currentAddress: z.string().optional(),
  education: z.string().optional(),
  employeeType: z.string().optional(),
  workStatus: z.string().optional(),
  employeeStatus: z.string().optional(),
  position: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  laborBookNo: z.string().optional(),
  idCardNo: z.string().optional(),
  nssfReggisterNo: z.string().optional(),
  branchId: z.number().optional(),
});

interface Props {
  initialData?: IEmployee | null;
  formRef: React.RefObject<HTMLFormElement | null>;
  setIsLoading: (loading: boolean) => void;
}

const EmployeeForm = ({ initialData, formRef, setIsLoading }: Props) => {
  const isEdit = !!initialData;
  const router = useRouter();

  const defaultValues = {
    empCode: initialData?.empCode ?? "",
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    firstNameKh: initialData?.firstNameKh ?? "",
    lastNameKh: initialData?.lastNameKh ?? "",
    gender: initialData?.gender ?? "MALE",
    dateOfBirth: formatDate(initialData?.dateOfBirth) ?? "",
    placeOfBirth: initialData?.placeOfBirth ?? "",
    nationality: initialData?.nationality ?? "",
    race: initialData?.race ?? "",
    maritalStatus: initialData?.maritalStatus ?? "SINGLE",
    childrenNumber: initialData?.childrenNumber ?? 0,
    phone: initialData?.phone ?? "",
    currentAddress: initialData?.currentAddress ?? "",
    education: initialData?.education ?? "",
    employeeType: initialData?.employeeType ?? "FULL_TIME",
    workStatus: initialData?.workStatus ?? "ACTIVE",
    employeeStatus: initialData?.employeeStatus ?? "PROBATION",
    position: initialData?.position ?? "",
    startDate:
      formatDate(initialData?.startDate) ??
      new Date().toISOString().split("T")[0],
    endDate: formatDate(initialData?.endDate) ?? "",
    laborBookNo: initialData?.laborBookNo ?? "",
    idCardNo: initialData?.idCardNo ?? "",
    nssfReggisterNo: initialData?.nssfReggisterNo ?? "",
    branchId: 1,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { create: createEmployeeMutate, update: updateEmployeeMutate } =
    useMutateEmployee();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (isEdit) {
      await updateEmployeeMutate(
        {
          employeeId: initialData.id,
          request: values,
        },
        {
          onSuccess: () => {
            form.reset();
            router.push("/admin/employees");
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } else {
      await createEmployeeMutate(
        { request: values },
        {
          onSuccess: () => {
            form.reset();
            router.push("/admin/employees");
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Row 1: First Name, Last Name, Phone Number, Avatar */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Sok" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dara" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="012345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="row-span-2">
            <FormLabel>Avatar</FormLabel>
            <div className="border-2 border-border rounded-lg h-full min-h-[140px] flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center mb-2">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Upload Photo</p>
              </div>
            </div>
          </div>

          {/* Row 2: First Name (KH), Last Name (KH), Position */}
          <FormField
            control={form.control}
            name="firstNameKh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name (KH)</FormLabel>
                <FormControl>
                  <Input placeholder="សុខ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastNameKh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name (KH)</FormLabel>
                <FormControl>
                  <Input placeholder="ដារ៉ា" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Accountant" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 3: Gender, Marital Status, Department, Section */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SINGLE">Single</SelectItem>
                    <SelectItem value="MARRIED">Married</SelectItem>
                    <SelectItem value="DIVORCED">Divorced</SelectItem>
                    <SelectItem value="WIDOWED">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 4: Date of Birth, Nationality, Start Date, End Date */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input placeholder="Cambodian" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 5: Race, Education, Children Number, Employee Type */}
          <FormField
            control={form.control}
            name="race"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Race</FormLabel>
                <FormControl>
                  <Input placeholder="Khmer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education</FormLabel>
                <FormControl>
                  <Input placeholder="Bachelor Degree" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="childrenNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Children Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employeeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Type</FormLabel>
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
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                    <SelectItem value="INTERN">Intern</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 6: Place of Birth (2 cols), Work Status, Employee Status */}
          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Place of Birth</FormLabel>
                <FormControl>
                  <Input placeholder="Phnom Penh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="RESIGNED">Resigned</SelectItem>
                    <SelectItem value="IN_ACTIVE">In-Active</SelectItem>
                    <SelectItem value="TERMINATED">Terminated</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employeeStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PROBATION">Probation</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                    <SelectItem value="PERMANENT">Permanent</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 7: Current Address (2 cols), Labor Book No, ID Card No */}
          <FormField
            control={form.control}
            name="currentAddress"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Current Address</FormLabel>
                <FormControl>
                  <Input placeholder="Phnom Penh, Cambodia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="laborBookNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Labor Book No</FormLabel>
                <FormControl>
                  <Input placeholder="LB-2025-0001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idCardNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID card no</FormLabel>
                <FormControl>
                  <Input placeholder="ID-123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 8: NSSF No, empty, empty, Employee Code */}
          <FormField
            control={form.control}
            name="nssfReggisterNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NSSF No</FormLabel>
                <FormControl>
                  <Input placeholder="NSSF-0001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2"></div>

          <FormField
            control={form.control}
            name="empCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Code</FormLabel>
                <FormControl>
                  <Input placeholder="EMP-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branchId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default EmployeeForm;

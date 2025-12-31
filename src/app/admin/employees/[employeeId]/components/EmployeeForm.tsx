"use client";

import { IEmployee } from "@/types/admin/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useMutateEmployee } from "@/stores/admin/useMutateEmployee";
import { useRouter } from "next/navigation";
import { employeeSchema, EmployeeValues } from "@/schemas/admin/employee";
import { WorkingShiftCombobox } from "@/components/comboboxes/WorkingShiftCombobox";

interface Props {
  initialData?: IEmployee | null;
  formRef: React.RefObject<HTMLFormElement | null>;
  setIsLoading: (loading: boolean) => void;
}

const EmployeeForm = ({ formRef, initialData, setIsLoading }: Props) => {
  const router = useRouter();
  const isEdit = !!initialData;

  const [selectedWorkingShiftId, setSelectedWorkingShiftId] = useState<
    number | undefined
  >(initialData?.workingShiftId);

  const formatDateForInput = (date: string | undefined) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  const defaultValues: Partial<EmployeeValues> = {
    empCode: initialData?.empCode ?? "",
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    firstNameKh: initialData?.firstNameKh ?? "",
    lastNameKh: initialData?.lastNameKh ?? "",
    gender: initialData?.gender,
    dateOfBirth: formatDateForInput(initialData?.dateOfBirth),
    placeOfBirth: initialData?.placeOfBirth ?? "",
    nationality: initialData?.nationality ?? "",
    race: initialData?.race ?? "",
    maritalStatus: initialData?.maritalStatus ?? "",
    childrenNumber: initialData?.childrenNumber ?? 0,
    phone: initialData?.phone ?? "",
    currentAddress: initialData?.currentAddress ?? "",
    education: initialData?.education ?? "",
    employeeType: initialData?.employeeType,
    workStatus: initialData?.workStatus,
    employeeStatus: initialData?.employeeStatus,
    start: formatDateForInput(initialData?.start),
    position: initialData?.position ?? "",
    startDate: formatDateForInput(initialData?.startDate),
    endDate: formatDateForInput(initialData?.endDate),
    laborBookNo: initialData?.laborBookNo ?? "",
    idCardNo: initialData?.idCardNo ?? "",
    nssfRegisterNo: initialData?.nssfRegisterNo ?? "",
    workingShiftId: initialData?.workingShiftId,
  };

  const form = useForm<EmployeeValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  const { create: createEmployeeMutate, update: updateEmployeeMutate } =
    useMutateEmployee();

  async function onSubmit(values: EmployeeValues) {
    console.log("click");
    setIsLoading(true);
    if (isEdit && initialData?.id) {
      await updateEmployeeMutate(
        { employeeId: initialData.id, request: values },
        {
          onSuccess: () => {
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
        className="space-y-6 py-10"
      >
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="empCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Employee Code <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="EMP-00123" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>

          {/* English Name */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ratana" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="San" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Khmer Name */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="firstNameKh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name (Khmer)</FormLabel>
                    <FormControl>
                      <Input placeholder="រតនា" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="lastNameKh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name (Khmer)</FormLabel>
                    <FormControl>
                      <Input placeholder="សាន" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Gender and Date of Birth */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Gender <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of Birth <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Place of Birth and Nationality */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="placeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place of Birth</FormLabel>
                    <FormControl>
                      <Input placeholder="Kandal Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
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
            </div>
          </div>

          {/* Race and Marital Status */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
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
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Marital Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select marital status" />
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
            </div>
          </div>

          {/* Children Number and Phone */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="childrenNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Children</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="010 555 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Current Address */}
          <FormField
            control={form.control}
            name="currentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phnom Penh, Sen Sok District"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Education */}
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education</FormLabel>
                <FormControl>
                  <Input placeholder="High School" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Employment Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Employment Information</h3>

          {/* Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Position <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Sewing Operator" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Employee Type and Work Status */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="employeeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Employee Type <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee type" />
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
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="workStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Work Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                        <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                        <SelectItem value="TERMINATED">Terminated</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Employee Status and Working Shift */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="employeeStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Employee Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PERMANENT">Permanent</SelectItem>
                        <SelectItem value="CONTRACT">Contract</SelectItem>
                        <SelectItem value="PROBATION">Probation</SelectItem>
                        <SelectItem value="TEMPORARY">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="workingShiftId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Working Shift <span className="text-red-500">*</span>
                    </FormLabel>
                    <WorkingShiftCombobox
                      value={selectedWorkingShiftId}
                      onChange={(id) => {
                        field.onChange(id);
                        setSelectedWorkingShiftId(id);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Start and Start Date */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Start <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Start Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* End Date */}
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
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Documents</h3>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="laborBookNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Labor Book No.</FormLabel>
                    <FormControl>
                      <Input placeholder="LB-554433" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="idCardNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Card No.</FormLabel>
                    <FormControl>
                      <Input placeholder="012345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="nssfRegisterNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NSSF Register No.</FormLabel>
                    <FormControl>
                      <Input placeholder="NSSF-889900" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeForm;

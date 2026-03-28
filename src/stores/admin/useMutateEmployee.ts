"use client";

import { EmployeeValues } from "@/schemas/admin/employee";
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "@/service/admin/employees.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { employeeKeys } from "@/service/util/query-keys/employee";

const RESOURCE = "Employee";

export const useMutateEmployee = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: EmployeeValues }) => {
      return await createEmployee(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);
      queryClient.invalidateQueries({
        queryKey: [employeeKeys.list_employee],
      });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      employeeId,
      request,
    }: {
      employeeId?: number;
      request?: EmployeeValues;
    }) => {
      return await updateEmployee(employeeId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);
      queryClient.invalidateQueries({
        queryKey: [employeeKeys.list_employee],
      });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ employeeId }: { employeeId?: number }) => {
      return await deleteEmployee(employeeId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: [employeeKeys.list_employee],
      });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    createEmployee: createMutation.mutateAsync,
    updateEmployee: updateMutation.mutateAsync,
    deleteEmployee: deleteMutation.mutateAsync,
  };
};

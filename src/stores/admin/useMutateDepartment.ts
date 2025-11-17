"use client";

import {
  createDepartment,
  deleteDepartment,
  ICreateDepartmentRequest,
  IUpdateDepartmentRequest,
  updateDepartment,
} from "@/service/admin/departments.service";
import { departmentCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Department";

export const useMutateDepartment = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateDepartmentRequest }) => {
      return await createDepartment(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      departmentCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      departmentId,
      request,
    }: {
      departmentId?: number;
      request?: IUpdateDepartmentRequest;
    }) => {
      return await updateDepartment(departmentId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      departmentCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ departmentId }: { departmentId?: number }) => {
      return await deleteDepartment(departmentId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      departmentCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
  };
};

"use client";

import {
  createCompany,
  deleteCompany,
  ICreateCompanyRequest,
  IUpdateCompanyRequest,
  updateCompany,
} from "@/service/admin/companies.service";
import { companyCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Company";

export const useMutateCompany = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateCompanyRequest }) => {
      return await createCompany(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      companyCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      companyId,
      request,
    }: {
      companyId?: number;
      request?: IUpdateCompanyRequest;
    }) => {
      return await updateCompany(companyId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      companyCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ companyId }: { companyId?: number }) => {
      return await deleteCompany(companyId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      companyCache.clearAll(queryClient);
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

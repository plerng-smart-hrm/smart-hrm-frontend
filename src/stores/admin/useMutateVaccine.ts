"use client";

import {
  createVaccine,
  deleteVaccine,
  ICreateVaccineRequest,
  IUpdateVaccineRequest,
  updateVaccine,
} from "@/service/admin/vaccine.service";
import { vaccineCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Vaccine";

export const useMutateVaccine = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateVaccineRequest }) => {
      return await createVaccine(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      vaccineCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      vaccineId,
      request,
    }: {
      vaccineId?: number;
      request?: IUpdateVaccineRequest;
    }) => {
      return await updateVaccine(vaccineId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      vaccineCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ vaccineId }: { vaccineId?: number }) => {
      return await deleteVaccine(vaccineId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      vaccineCache.clearAll(queryClient);
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

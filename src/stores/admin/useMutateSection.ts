"use client";

import {
  createSection,
  deleteSection,
  ICreateSectionRequest,
  IUpdateSectionRequest,
  updateSection,
} from "@/service/admin/sections.service";
import { sectionKeys } from "@/service/util/query-keys/section";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Section";

export const useMutateSection = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateSectionRequest }) => {
      return await createSection(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);
      queryClient.invalidateQueries({
        queryKey: [sectionKeys.list_section],
      });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      sectionId,
      request,
    }: {
      sectionId?: number;
      request?: IUpdateSectionRequest;
    }) => {
      return await updateSection(sectionId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({
        queryKey: [sectionKeys.list_section],
      });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ sectionId }: { sectionId?: number }) => {
      return await deleteSection(sectionId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({
        queryKey: [sectionKeys.list_section],
      });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    createSection: createMutation.mutateAsync,
    updateSection: updateMutation.mutateAsync,
    deleteSection: deleteMutation.mutateAsync,
  };
};

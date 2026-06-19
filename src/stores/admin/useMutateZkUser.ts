"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteZkUser, RemoveUserReq } from "@/service/admin/zk.service";

export const useMutateZkUser = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: ({ request }: { request: RemoveUserReq; queryKey: string }) => deleteZkUser(request),
    onSuccess: (_, { queryKey }) => {
      toast.success("User removed from device");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (err: any) => {
      const message = err?.message ?? err?.error ?? "Failed to remove user from device";
      toast.error(message);
    },
  });

  return {
    deleteUser: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};

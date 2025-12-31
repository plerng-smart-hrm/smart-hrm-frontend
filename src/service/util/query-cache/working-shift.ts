import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query-keys/working-shift";

export const workingShiftCache = {
  clearAll: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.workingShifts.root,
    });
  },

  clearList: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.workingShifts.list(),
    });
  },

  clearDetail: (queryClient: QueryClient, id?: number) => {
    queryClient.removeQueries({
      queryKey: queryKeys.workingShifts.detail(id),
    });
  },
};

import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query-keys/device";

export const deviceCache = {
  clearAll: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.devices.root,
    });
  },

  clearList: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.devices.list(),
    });
  },

  clearDetail: (queryClient: QueryClient, id?: number) => {
    queryClient.removeQueries({
      queryKey: queryKeys.devices.detail(id),
    });
  },
};

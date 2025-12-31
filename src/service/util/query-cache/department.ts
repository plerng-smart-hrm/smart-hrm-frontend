import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query-keys/department";

export const departmentCache = {
  clearAll: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.departments.root,
    });
  },

  clearList: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.departments.list(),
      exact: false,
    });
  },

  clearDetail: (queryClient: QueryClient, id?: number) => {
    queryClient.removeQueries({
      queryKey: queryKeys.departments.detail(id),
    });
  },
};

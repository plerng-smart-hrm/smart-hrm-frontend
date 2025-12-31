import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query-keys/employee";

export const employeeCache = {
  clearAll: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.employees.root,
    });
  },

  clearList: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.employees.list(),
      exact: false,
    });
  },

  clearDetail: (queryClient: QueryClient, id?: number) => {
    queryClient.removeQueries({
      queryKey: queryKeys.employees.detail(id),
    });
  },
};

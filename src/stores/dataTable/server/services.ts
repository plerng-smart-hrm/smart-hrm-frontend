import { queryKeyMappingApiPath } from "@/service/util/paths";
import { ISortFieldItem } from "@/types/api";
import { getDataTableUrlQueryString } from "@/utils/api/request";
import { get } from "lodash";

export const searchDataTableService = (
  queryKey: string | undefined,
  pageNumber: number,
  pageSize: number,
  sort?: ISortFieldItem | undefined,
  search?: string | undefined,
  query?: string,
) => {
  let apiUrl = get(queryKeyMappingApiPath, queryKey ?? "");
  if (query) {
    apiUrl = apiUrl.replace("{key}", query);
  }
  let searchValue = search;
  if (searchValue === "null") {
    searchValue = "";
  }
  const params = {
    pageNumber,
    pageSize,
    sort,
    search: searchValue,
  };

  return getDataTableUrlQueryString({
    urlPath: apiUrl,
    ...params,
  });
};

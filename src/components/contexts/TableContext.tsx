"use client";

import useQueryDataTable from "@/stores/dataTable/server/useQueryDataTable";
import { ISearchQuery } from "@/types/searchQueryType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { PropsWithChildren, createContext, useContext } from "react";

interface IProps extends PropsWithChildren {
  queryKey: string | undefined;
  defaultQuery?: ISearchQuery[];
  query?: string;
  pageSize?: number;
}

interface PaginationContextProps {
  page: number;
  data: any;
  totalPages: number;
  totalInPages: number;
  totalRecord: number;
  handleChangePage: (_page?: number | undefined) => void;
  handlePrevious: () => void;
  isLoading: boolean;
  handleSearch: (_value: string) => void;
  handleFilters: (_value: string) => void;
  handleChangePageSize: (_value: string) => void;
  handleRefresh: () => void;
  search: string;
}

const defaultValue: PaginationContextProps = {
  page: 1,
  data: [],
  totalPages: 0,
  totalInPages: 0,
  totalRecord: 0,
  handleChangePage: (_page?: number | undefined) => {},
  handlePrevious: () => {},
  handleRefresh: () => {},
  handleSearch: (_value: string) => {},
  handleFilters: (_value: string) => {},
  handleChangePageSize: (_value: string) => {},
  isLoading: false,
  search: "",
};

export const PaginationContext =
  createContext<PaginationContextProps>(defaultValue);

export const PaginationProvider = ({
  queryKey,
  query,
  pageSize = 10,
  children,
}: IProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("limit")) || pageSize;
  const search = String(searchParams.get("search")) || "";

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { data: response } = useQueryDataTable({
    queryKey: queryKey,
    enabled: !!queryKey,
    pageNumber: page,
    pageSize: perPage,
    query: query,
    search: search ?? undefined,
    setIsLoading,
  }) as any;

  const setParamsQuery = (value: string | number, fields: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(fields, value.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChangePage = (lastPage?: number | undefined) => {
    if (lastPage) {
      setParamsQuery(lastPage, "page");
    } else {
      setParamsQuery(page + 1, "page");
    }
  };

  const handlePrevious = () => {
    if (page > 1) setParamsQuery(page - 1, "page");
  };

  const handleSearch = (value: string) => {
    setParamsQuery(value, "search");
  };

  const handleFilters = (value: string) => {
    // setParamsQuery(value, "filter");
  };

  const handleChangePageSize = (value: string) => {
    setParamsQuery(value, "limit");
  };

  const handleRefresh = () => {
    router.push(pathname);
  };

  const totalPages = response?.total ? Math.ceil(response?.total / perPage) : 0;

  return (
    <PaginationContext.Provider
      value={{
        page,
        data: response?.data ?? [],
        totalPages,
        totalRecord: response?.total ?? 0,
        totalInPages: totalPages,
        handleChangePage,
        handlePrevious,
        handleSearch,
        handleFilters,
        handleChangePageSize,
        handleRefresh,
        isLoading,
        search,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => {
  return useContext(PaginationContext);
};

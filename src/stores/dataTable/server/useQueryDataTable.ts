import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { ISortFieldItem } from '@/types/api';
import { searchDataTableService } from './services';
import { useEffect } from 'react';

interface IProps {
  queryKey: string | undefined;
  pageNumber?: number;
  pageSize?: number;
  sort?: ISortFieldItem;
  search?: string;
  query?: string;
  enabled?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const useQueryDataTable = ({
  queryKey,
  pageNumber = 1,
  pageSize = 10,
  sort,
  search,
  query,
  enabled = true,
  setIsLoading
}: IProps) => {
  const queryResult = useQuery({
    queryKey: [queryKey, pageNumber, pageSize, sort, search, query],
    queryFn: () => searchDataTableService(queryKey, pageNumber, pageSize, sort, search, query),
    select: ({ data }) => {
      const responseData = (data as { data?: any[] })?.data ?? [];
      const total = (data as { total: number })?.total ?? 0;
      return { data: responseData, total: total };
    },
    placeholderData: keepPreviousData,
    enabled,
  });

  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(queryResult.isLoading || queryResult.isFetching);
    }
  }, [queryResult.isLoading, queryResult.isFetching, setIsLoading]);

  return queryResult;
}

export default useQueryDataTable;
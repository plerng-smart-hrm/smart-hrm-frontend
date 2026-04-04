import { get } from "@/utils/api/request";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const sharedServer = async (url: string, param?: any) => {
  return await get<any>(url, param);
};

interface IProps {
  url: string;
  key?: string;
  param?: any;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  enable?: boolean;
}

const useQueryShared = ({
  url,
  key = "default_query",
  param,
  setIsLoading,
  enable = true,
}: IProps) => {
  const queryResult = useQuery({
    queryKey: [key, param],
    queryFn: () => sharedServer(url, param),
    select: ({ data }) => {
      return data as any;
    },
    enabled: enable,
  });

  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(queryResult.isLoading || queryResult.isFetching);
    }
  }, [queryResult.isLoading, queryResult.isFetching, setIsLoading]);

  return queryResult;
};

export default useQueryShared;

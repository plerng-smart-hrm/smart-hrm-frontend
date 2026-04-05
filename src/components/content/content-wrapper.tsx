import { Card, CardContent } from "@/components/ui/card";
import { PaginationProvider } from "../contexts/TableContext";
import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  pageSize?: number;
  query?: string;
  queryKey?: string;
}
export default function ContentWrapper({
  queryKey,
  query,
  pageSize = 10,
  children,
}: IProps) {
  return (
    <PaginationProvider queryKey={queryKey} query={query} pageSize={pageSize}>
      <Card className="rounded-lg border-none">
        <CardContent className="px-4">
          <div className="flex flex-col relative">{children}</div>
        </CardContent>
      </Card>
    </PaginationProvider>
  );
}

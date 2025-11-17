"use client";
import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ISection } from "@/types/admin";
import { getAllSections } from "@/service/admin/sections.service";
import { useMutateSection } from "@/stores/admin/useMutateSection";
import { sectionColumns } from "./columns";
import SectionDialog from "./SectionDialog";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const SectionClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [section, setSection] = useState<ISection | undefined>(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.sections.list(pageIndex, pageSize),
    queryFn: () => getAllSections(pageIndex, pageSize),
  });

  const sections = data?.sections ?? [];
  const pagination = data?.pagination;

  const cols = sectionColumns({
    onEdit: (row) => {
      setIsOpen(true);
      setSection(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setSection(row);
    },
  });
  const { delete: deleteSectionMutate } = useMutateSection();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteSectionMutate(
      { sectionId: section?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setSection(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const handlePaginationChange = ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    const params = new URLSearchParams(searchParams);
    params.set("pageIndex", String(pageIndex));
    params.set("pageSize", String(pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <div>
      {isOpen && (
        <SectionDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setSection(undefined);
          }}
          sectionId={section?.id}
        />
      )}

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Section"
          description={`This will remove the ${section?.name}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={sections}
        serverMode={true}
        pageCount={pagination?.totalPages ?? 0}
        onPaginationChange={handlePaginationChange}
        initialPageIndex={pageIndex}
        initialPageSize={pageSize}
        createLabel="Create"
        onCreateClick={() => {
          setIsOpen(true);
        }}
      />
    </div>
  );
};

export default SectionClient;

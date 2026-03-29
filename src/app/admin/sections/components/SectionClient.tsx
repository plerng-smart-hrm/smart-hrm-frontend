"use client";
import { useState } from "react";
import { ISection } from "@/types/admin";
import { useMutateSection } from "@/stores/admin/useMutateSection";
import { sectionColumns } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import SharedDialog from "@/components/shared/SharedDialog";
import SectionForm from "./form/SectionForm";

const SectionClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [section, setSection] = useState<ISection | undefined>(undefined);

  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: ISection) => {
        setIsOpen(true);
        setSection(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: ISection) => {
        setIsDelete(true);
        setSection(value);
      },
    },
  ];

  const { table } = useDataTable({
    columns: sectionColumns(actionButton),
  });

  const { deleteSection } = useMutateSection();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteSection(
      { sectionId: section?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setSection(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div>
      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions
            actions={[
              {
                name: "Create",
                icon: PlusIcon,
                event: () => {
                  setSection(undefined);
                  setIsOpen(true);
                },
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        title={`${section ? "Update" : "Create"} Section`}
        setOpen={setIsOpen}
        open={isOpen}
        isSubmit={false}
        isCancel={false}
        isLoading={isLoading}
        width="40%"
      >
        <SectionForm initialData={section} onSuccess={() => setIsOpen(false)} />
      </SharedDialog>

      <SharedDialog
        title={"Delete Section"}
        setOpen={setIsDelete}
        open={isDelete}
        submitEvent={handleDelete}
        isSubmit
        submitTitle="Yes, Delete"
        className="bg-red-500"
        isLoading={isLoading}
        width="50%"
      >
        <p>This will remove the {section?.name}</p>
      </SharedDialog>
    </div>
  );
};

export default SectionClient;

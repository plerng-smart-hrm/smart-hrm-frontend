"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ITermination } from "@/types/admin/termination";
import { useDataTable } from "@/hooks/use-data-table";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";
import { useMutateTermination } from "@/stores/admin/useMutateTermination";
import SharedDialog from "@/components/shared/SharedDialog";
import { EyeIcon, PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { terminationColumns } from "./columns";
import TerminationForm from "@/app/admin/employees/components/termination/TerminationForm";
import TerminationView from "./TerminationView";

const TerminationClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTerminationForm, setIsTerminationForm] = useState(false);
  const [isTerminationView, setIsTerminationView] = useState(false);
  const [isTerminate, setIsTerminate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [termination, setTermination] = useState<ITermination | undefined>(undefined);

  const actionButton = [
    {
      name: "View",
      icon: EyeIcon,
      event: (value: ITermination) => {
        setTermination(value);
        setIsTerminationView(true);
      },
    },
    {
      name: "Update",
      icon: PenIcon,
      event: (value: ITermination) => {
        setTermination(value);
        setIsTerminationForm(true);
      },
    },
    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: ITermination) => {
        setIsDelete(true);
        setTermination(value);
      },
    },
  ];

  const { table } = useDataTable<ITermination, unknown>({
    columns: terminationColumns(actionButton),
  });

  const { deleteTermination } = useMutateTermination();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteTermination(
      { terminationId: termination?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setTermination(undefined);
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
                  setTermination(undefined);
                  setIsTerminationForm(true);
                },
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        title={"Delete Termination"}
        setOpen={setIsDelete}
        open={isDelete}
        submitEvent={handleDelete}
        isSubmit
        submitTitle="Yes, Delete"
        className="bg-red-500"
        isLoading={isLoading}
        width="50%"
      >
        <p>
          This will remove termination
          <span className="font-bold">
            {termination?.employee?.lastName} {termination?.employee?.firstName}
          </span>
        </p>
      </SharedDialog>

      <SharedDialog
        setOpen={() => {
          setIsTerminationForm(false);
          setTermination(undefined);
        }}
        open={isTerminationForm}
        title={termination ? "Update Termination" : "Create Termination"}
        isCancel={false}
        width="90%"
        height="95%"
      >
        <TerminationForm
          setOpen={(open) => {
            setIsTerminationForm(open);
            if (!open) setTermination(undefined);
          }}
          employee={termination?.employee ?? null}
        />
      </SharedDialog>

      <SharedDialog
        setOpen={() => {
          setIsTerminationView(false);
          setTermination(undefined);
        }}
        open={isTerminationView}
        title="Termination Details"
        isCancel={false}
        width="70%"
        height="95%"
      >
        <TerminationView termination={termination ?? null} />
      </SharedDialog>
    </div>
  );
};

export default TerminationClient;

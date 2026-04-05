"use client";
import { useState } from "react";
import { holidayColumns } from "./columns";
import { DashboardCard } from "@/components/DashboardCard";
import { IHoliday } from "@/types/admin";
import { useMutateHoliday } from "@/stores/admin/useMutateHoliday";
import HolidayDialog from "./HolidayDialog";
import { DownloadIcon, PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import ImportFactoryModal from "./ImportHolidayModal";
import { useDataTable } from "@/hooks/use-data-table";
import { IEmployee } from "@/types/admin/employee";
import SharedDialog from "@/components/shared/SharedDialog";
import BaseDataTable from "@/components/shared/table/BaseDataTable";
import { ToolbarActions } from "@/components/shared/table/ToolbarActions";
import { ToolBarDataTale } from "@/components/shared/table/ToolBarDataTale";

const HolidayClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isForm, setIsForm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [holiday, setHoliday] = useState<IHoliday | undefined>(undefined);
  const [openImportModel, setOpenImportModel] = useState<boolean>(false);

  const actionButton = [
    {
      name: "Update",
      icon: PenIcon,
      event: (value: IHoliday) => {
        setIsForm(true);
        setHoliday(value);
      },
    },

    {
      name: "Delete",
      icon: TrashIcon,
      event: (value: IHoliday) => {
        setIsDelete(true);
        setHoliday(value);
      },
    },
  ];

  const { table } = useDataTable<IEmployee, unknown>({
    columns: holidayColumns(actionButton),
  });

  const { delete: deleteHolidayMutate } = useMutateHoliday();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteHolidayMutate(
      { holidayId: holiday?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setHoliday(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        <DashboardCard
          title="Total Holiday"
          value={60}
          icon="/icons/holidays.png"
        />

        <DashboardCard
          title="Public Holiday"
          value={60}
          icon="/icons/public.png"
        />

        <DashboardCard
          title="Company Holiday"
          value={60}
          icon="/icons/company.png"
        />

        <DashboardCard
          title="Up Coming"
          value={60}
          icon="/icons/upcoming.png"
        />
      </div>

      <BaseDataTable table={table}>
        <ToolBarDataTale table={table}>
          <ToolbarActions
            actions={[
              {
                name: "Create",
                icon: PlusIcon,
                event: () => {
                  setIsForm(true);
                },
              },
              {
                name: "Import Excel",
                icon: DownloadIcon,
                event: () => {
                  setOpenImportModel(true);
                },
              },
            ]}
          />
        </ToolBarDataTale>
      </BaseDataTable>

      <SharedDialog
        title={"Delete Holiday"}
        setOpen={setIsDelete}
        open={isDelete}
        submitEvent={handleDelete}
        isSubmit
        submitTitle="Yes, Delete"
        className="bg-red-500"
        isLoading={isLoading}
        width=""
        height=""
      >
        <p>
          This will remove the
          <span className="font-bold">{holiday?.name}</span>
        </p>
      </SharedDialog>

      {isForm && (
        <HolidayDialog
          isOpen={isForm}
          setIsOpen={() => {
            setIsForm(false);
            setHoliday(undefined);
          }}
          holidayId={holiday?.id}
        />
      )}

      <ImportFactoryModal
        open={openImportModel}
        onClose={() => setOpenImportModel(false)}
      />
    </div>
  );
};

export default HolidayClient;

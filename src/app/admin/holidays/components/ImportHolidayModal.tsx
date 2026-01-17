"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutateHoliday } from "@/stores/admin/useMutateHoliday";
import { LoadingButton } from "@/components/LoadingButton";
import { ArrowRightCircleIcon } from "lucide-react";
import ShareUploadFile from "@/components/ShareUploadFile";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ImportHolidayModal = ({ open, onClose }: Props) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { import: importHoliday } = useMutateHoliday();
  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    setIsLoading(true);

    await importHoliday(
      { file: files[0] },
      {
        onSuccess: () => {
          onClose();
          setFiles(null);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(openState) => {
        if (!openState) {
          setFiles(null);
        }
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Holidays</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Download template */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              window.open("/templates/Holiday_Template.xlsx", "_blank")
            }
          >
            <ArrowRightCircleIcon className="w-4 h-4 mr-2" />
            ទាញយកកំរូវសម្រាប់ Import
          </Button>

          {/* Upload Excel */}
          <ShareUploadFile
            files={files}
            onFilesChange={setFiles}
            maxFiles={1}
            multiple={false}
            acceptedFileTypes={[".xlsx"]}
            label="Upload Excel File"
            description="Only .xlsx files are supported"
          />

          {/* Submit */}
          <LoadingButton
            loading={isLoading}
            className="w-full"
            onClick={handleUpload}
            disabled={!files || files.length === 0}
          >
            Upload & Import
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportHolidayModal;
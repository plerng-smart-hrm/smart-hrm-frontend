"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CloudUpload, Paperclip, Trash2, Eye } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./FileUploader";
import { ConfirmDialog } from "./ConfirmDialog";

interface ExistingFile {
  id: number;
  request_fund_id: number;
  file_url: string;
  original_name: string;
  extension: string;
}

interface Props {
  files: File[] | null;
  onFilesChange: (files: File[] | null) => void;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  acceptedFileTypes?: string[];
  className?: string;
  label?: string;
  description?: React.ReactNode;
  disabled?: boolean;
  existingFiles?: ExistingFile[];
  onRemoveExistingFile?: (fileId: number) => void;
}

export default function ShareUploadFile({
  files,
  onFilesChange,
  maxFiles = 5,
  maxSize = 1024 * 1024 * 4, // 4MB default
  multiple = true,
  acceptedFileTypes = ["image/*", ".pdf", ".doc", ".docx", ".xls", ".xlsx"],
  className,
  label = "Upload Files",
  description = "Select files to upload",
  disabled = false,
  existingFiles = [],
  onRemoveExistingFile,
}: Props) {
  const dropZoneConfig = {
    maxFiles,
    maxSize,
    multiple,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
  };

  const [isDelete, setIsDelete] = React.useState(false);
  const [deleteFileId, setDeleteFileId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDownloadExistingFile = (file: ExistingFile) => {
    const link = document.createElement("a");
    link.href = file.file_url;
    link.download = file.original_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemoveFile = (fileId: number) => {
    if (onRemoveExistingFile) {
      onRemoveExistingFile(fileId);
    }
  };

  const handleDelete = async () => {
    if (!deleteFileId || !onRemoveExistingFile) return;

    try {
      setIsLoading(true);
      onRemoveExistingFile(deleteFileId);
    } finally {
      setIsLoading(false);
      setIsDelete(false);
      setDeleteFileId(null);
    }
  };

  return (
    <>
      <div className={cn("space-y-2", className)}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}

        <FileUploader
          value={files}
          onValueChange={onFilesChange}
          dropzoneOptions={dropZoneConfig}
          className="relative bg-background rounded-lg p-2"
        >
          <FileInput
            className={cn(
              "outline-dashed outline-1 outline-slate-500",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <div className="flex items-center justify-center flex-col p-4 w-full">
              <CloudUpload className="text-gray-500 w-5 h-5" />
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{disabled ? "Upload disabled" : "Click to upload"}</span>
                {!disabled && <>&nbsp; or drag and drop</>}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {acceptedFileTypes.join(", ")} (Max: {formatFileSize(maxSize)})
              </p>
              {maxFiles > 1 && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Up to {maxFiles} files
                </p>
              )}
            </div>
          </FileInput>

          <FileUploaderContent className="space-y-1">
            {/* Display existing files */}
            {existingFiles &&
              existingFiles.length > 0 &&
              existingFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 rounded-md"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Paperclip className="h-4 w-4 stroke-current" />
                    <div className="flex flex-col flex-1">
                      <span className="text-sm">{file.original_name}</span>
                      <span className="text-xs text-gray-500">
                        {file.extension.toUpperCase()} file
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDownloadExistingFile(file)}
                      className="p-1 cursor-pointer"
                      title="Download file"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {onRemoveExistingFile && (
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteFileId(file.id);
                          setIsDelete(true);
                        }}
                        className="cursor-pointer"
                        title="Remove file"
                      >
                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

            {/* Display new files */}
            {files &&
              files.length > 0 &&
              files.map((file, i) => (
                <FileUploaderItem key={i} index={i}>
                  <Paperclip className="h-4 w-4 stroke-current" />
                  <div className="flex flex-col">
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </FileUploaderItem>
              ))}
          </FileUploaderContent>
        </FileUploader>

        {description &&
          (typeof description === "string" ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : (
            <div className="text-sm text-muted-foreground">{description}</div>
          ))}
      </div>

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete File"
          description="Are you sure you want to delete this file? This action cannot be undone."
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

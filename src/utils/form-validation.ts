import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

interface FieldConfig {
  key: string;
  label: string;
}

interface ShowValidationWarningOptions {
  /** Field configuration array with key and label */
  fields: FieldConfig[];
  /** Form errors from react-hook-form */
  errors: FieldErrors;
  /** Show all errors or just the first one */
  showAll?: boolean;
}

/**
 * Shows a toast warning for form validation errors
 * Uses field labels for user-friendly messages
 */
export function showValidationWarning({
  errors,
  showAll = false,
}: ShowValidationWarningOptions): void {
  const errorEntries = Object.entries(errors);

  if (errorEntries.length === 0) return;

  if (showAll) {
    const messages = errorEntries.map(([_, error]) => {
      // const fieldLabel = fields.find((f) => f.key === fieldName)?.label || fieldName;
      const message =
        (error as { message?: string })?.message || "Invalid value";
      return `${message}`;
    });
    toast.warning(messages.join("\n"));
  } else {
    const [_, error] = errorEntries[0];
    // const fieldLabel = fields.find((f) => f.key === fieldName)?.label || fieldName;
    const message = (error as { message?: string })?.message || "Invalid value";
    toast.warning(`${message}`);
  }
}

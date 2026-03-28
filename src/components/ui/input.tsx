import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}
function Input({
  className,
  readOnly,
  type,
  error = false,
  ...props
}: InputProps) {
  const sanitizedProps = { ...props };
  delete (sanitizedProps as any).readonly;

  return (
    <input
      readOnly={readOnly}
      type={type}
      data-slot="input"
      aria-invalid={!!error}
      className={cn(
        "file:text-[11px]  placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:text-white dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base md:text-[11px] shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-gray-400 file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-gray-400",
        className,
      )}
      {...sanitizedProps}
    />
  );
}

export { Input };

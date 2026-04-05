"use client";

import { Button } from "@/components/ui/button";
import { Copy, Download, Trash } from "lucide-react";
import {
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";
import { get } from "lodash";
import React from "react";

interface JsonEditorProps {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  label?: string;
  field?: {
    field: ControllerRenderProps<any>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<any>;
  };
}

// function tryFixJson(str: string): string {
//   let s = str;

//   // remove trailing commas
//   s = s.replace(/,\s*([}\]])/g, "$1");

//   // add quotes to unquoted keys → {name: "John"} → {"name": "John"}
//   s = s.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

//   // convert single quotes → double quotes
//   s = s.replace(/'/g, '"');

//   return s;
// }

export function JsonEditor({
  value = "",
  label,
  field,
  setValue,
}: JsonEditorProps) {
  const getField = field?.field ?? undefined;
  const formState = field?.formState?.errors;
  const fieldName = getField?.name ?? "";
  const fieldError = get(formState, fieldName);
  const hasError = Boolean(fieldError);
  const [preview, setPreview] = React.useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(value || getField?.value);
  };

  const handleDownload = () => {
    const raw = getField?.value ?? value;
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    const pretty = JSON.stringify(parsed, null, 2);
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:application/json;charset=utf-8," + encodeURIComponent(pretty),
    );
    element.setAttribute("download", "form-config.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFormat = () => {
    const raw = getField?.value ?? value;

    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

      const pretty = JSON.stringify(parsed, null, 2);

      if (getField?.onChange) {
        getField.onChange(parsed);
      }
      setValue?.(parsed);

      setPreview(pretty);
    } catch (err: any) {
      alert("Invalid JSON: " + err.message);
    }
  };

  return (
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium text-muted-foreground">
          {label ?? "Editor"}
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFormat}
            className="h-8 px-2"
          >
            Format
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8 px-2"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => getField?.onChange("")}
            className="h-8 px-2"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="w-full px-2 pt-2">
        <textarea
          value={
            preview ||
            (getField
              ? typeof getField.value === "object"
                ? JSON.stringify(getField.value, null, 2)
                : (getField.value ?? "")
              : typeof value === "object"
                ? JSON.stringify(value, null, 2)
                : value)
          }
          onChange={e => {
            if (getField?.onChange) {
              getField.onChange(e.target.value);
            } else {
              setValue?.(e.target.value);
            }
          }}
          className="w-full p-2 resize-none rounded border border-border bg-background font-mono text-sm text-foreground placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          rows={10}
          spellCheck="false"
          aria-invalid={!!hasError}
        />
      </div>
    </div>
  );
}

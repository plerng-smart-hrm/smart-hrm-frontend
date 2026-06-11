"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import flags from "react-phone-number-input/flags";

interface CambodiaPhoneInputProps
    extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
    onChange?: (value: string) => void;
    value?: string;
    className?: string;
}

const CambodiaPhoneInput = React.forwardRef<
    HTMLInputElement,
    CambodiaPhoneInputProps
>(({ className, onChange, value = "+855", ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const digitsOnly = inputValue.replace(/\D/g, "");
        let formattedValue = "+855" + digitsOnly.slice(0, 9);
        formattedValue = formattedValue.replace(/^(\+855)0+/, "$1");
        onChange?.(formattedValue);
    };

    const displayValue = value.startsWith("+855") ? value.slice(4) : "";

    return (
        <div className="flex items-center">
            {/* Country code section - matches original image exactly */}
            <div className="inline-flex h-10 items-center rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <span className="mr-2 flex h-4 w-6 overflow-hidden">
                    {flags.KH && <flags.KH title="Cambodia" />}
                </span>
                <span>+855</span>
            </div>

            {/* Phone input - matches original styling */}
            <Input
                ref={ref}
                className={cn(
                    //"h-10 rounded-l-none border-l-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "flex rounded-l-none border-l-0 h-10",
                    className,
                )}
                value={displayValue}
                onChange={handleChange}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={9}
                placeholder=""
                {...props}
            />
        </div>
    );
});

CambodiaPhoneInput.displayName = "CambodiaPhoneInput";

export { CambodiaPhoneInput };

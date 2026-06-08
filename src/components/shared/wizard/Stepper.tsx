"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WizardStep {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      <p className="text-sm text-muted-foreground mb-3">
        Step {currentStep + 1} of {steps.length} &middot; {steps[currentStep]?.title}
      </p>
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = !!onStepClick;

          return (
            <div key={step.title} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => onStepClick?.(index)}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary text-primary",
                  !isCompleted && !isCurrent && "border-muted-foreground/30 text-muted-foreground/60",
                  isClickable && "cursor-pointer hover:opacity-80",
                )}
                aria-label={`Go to ${step.title}`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1 rounded transition-colors",
                    isCompleted ? "bg-primary" : "bg-muted-foreground/20",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="hidden sm:flex mt-2">
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            disabled={!onStepClick}
            onClick={() => onStepClick?.(index)}
            className={cn(
              "flex-1 text-center text-xs px-1 transition-colors",
              index === steps.length - 1 && "flex-none w-9",
              index === currentStep ? "text-primary font-medium" : "text-muted-foreground",
              onStepClick && "cursor-pointer hover:text-primary",
            )}
          >
            {step.title}
          </button>
        ))}
      </div>
    </div>
  );
}

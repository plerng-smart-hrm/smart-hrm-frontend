import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export type TypeVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;
interface IProps {
  handleEvent: (_value?: any) => void;
  isLoading?: boolean;
  label?: string;
  disabled?: boolean;
  variant?: TypeVariant;
  className?: string;
  icon?: LucideIcon;
}

const LoadingButton = ({
  isLoading,
  handleEvent,
  label = "Create",
  variant = "default",
  className,
  icon,
  disabled,
}: IProps) => {
  const Icon = () => {
    if (icon) {
      const Icon = icon;
      return <Icon className="-mt-[2px] mr-1 " />;
    }
  };
  return (
    <Button
      type="submit"
      className={`w-full sm:w-auto px-6 py-2 h-9 flex items-center justify-center gap-2 select-none ${className}`}
      disabled={isLoading || disabled}
      onClick={() => handleEvent?.()}
      variant={variant}
    >
      {isLoading ? (
        <>
          <Spinner size="small" className="text-white" />
          <span>Please wait</span>
        </>
      ) : (
        <>
          {icon ? <Icon /> : null}
          <span>{label}</span>
        </>
      )}
    </Button>
  );
};

export default LoadingButton;

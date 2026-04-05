import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeVariant = "blue" | "green" | "red" | "yellow" | "gray";

interface SharedBadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 border-transparent",
  green: "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500 border-transparent",
  red: "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500 border-transparent",
  yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500 border-transparent",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500 border-transparent",
};

export const SharedBadge = ({ variant = "blue", className, children, ...props }: SharedBadgeProps) => {
  return (
    <Badge className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Badge>
  );
};

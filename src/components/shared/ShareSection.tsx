import { cn } from "@/lib/utils";

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
  contentClassName?: string;
  accent: string;
  children: React.ReactNode;
}

export function ShareSection({
  icon,
  title,
  accent,
  className,
  contentClassName,
  children,
}: SectionProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-border shadow-sm",
        className
      )}
    >
      {/* Section Header */}
      <div
        className={`flex items-center gap-2.5 px-3 py-2 sm:px-4 sm:py-3 ${accent}`}
      >
        <span className="opacity-80">{icon}</span>
        <h3 className="text-sm font-semibold tracking-wide uppercase">
          {title}
        </h3>
      </div>

      {/* Section Body */}
      <div className={`px-3 py-2 sm:px-4 sm:py-3 ${contentClassName ?? ""}`}>
        {children}
      </div>
    </div>
  );
}

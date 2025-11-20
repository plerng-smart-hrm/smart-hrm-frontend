import Image from "next/image";
import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  value: number | string;
  icon: string;
}

export function DashboardCard({ title, value, icon }: Props) {
  return (
    <Card className="p-4 transition-all hover:shadow-md hover:-translate-y-1">
      <div className="grid grid-cols-2 gap-4 items-center">
        {/* Left Side */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
        </div>

        {/* Right Side Icon */}
        <div className="flex justify-end">
          <Image
            src={icon}
            alt={title}
            width={50}
            height={50}
            className="object-contain opacity-90"
          />
        </div>
      </div>
    </Card>
  );
}

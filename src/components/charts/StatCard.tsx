import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, className }: StatCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-1">
        <CardTitle className="font-medium text-white">{title}</CardTitle>
        <Icon className="h-4 w-4 text-white" />
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xl text-white">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;

import { isEmpty } from "lodash";
import {
  BookOpenCheck,
  BookOpenText,
  Cog,
  Contact,
  Dock,
  Factory,
  FileClock,
  FileCog,
  FileStack,
  FolderCog,
  Gauge,
  GraduationCap,
  IdCard,
  LaptopMinimalCheck,
  LucideIcon,
  MessageSquare,
  Shield,
  ShieldCheck,
  ShieldUser,
  Signature,
  TableOfContents,
  University,
  UserCog,
  UserRoundCheck,
  CircleDollarSign,
  Users,
  HandCoins,
  Wallet,
  ChartPie,
  MonitorCheck,
  FileSpreadsheet,
  ContactRound,
  ChartBarBig,
  File,
  FileText,
  UserRoundPen,
  UserPlus,
  FolderClosed,
} from "lucide-react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { toast } from "sonner";

export const ignoreActions: { [key: string]: boolean } = {
  PSP_SMP: true,
};

export const copyString = async (value: string, field?: string) => {
  if (value) {
    await navigator.clipboard.writeText(value);
    toast.success(`${field ?? ""} copied!`, {
      id: "copy-toast",
    });
  }
};

export const permissionHelper = [
  {
    label: "View",
    value: "VIEW",
  },
  {
    label: "Create",
    value: "CREATE",
  },
  {
    label: "Update",
    value: "UPDATE",
  },
  {
    label: "Delete",
    value: "DELETE",
  },
  {
    label: "Export",
    value: "EXPORT",
  },
  {
    label: "Import",
    value: "IMPORT",
  },
  {
    label: "Download",
    value: "DOWNLOAD",
  },
];

export const iconMap: { [key: string]: LucideIcon } = {
  UserRoundCheck,
  Shield,
  ShieldUser,
  FileClock,
  MessageSquare,
  Contact,
  FileCog,
  UserCog,
  FolderCog,
  Cog,
  FileStack,
  IdCard,
  TableOfContents,
  University,
  GraduationCap,
  Dock,
  LaptopMinimalCheck,
  ShieldCheck,
  Factory,
  BookOpenCheck,
  BookOpenText,
  Gauge,
  Signature,
  CircleDollarSign,
  Users,
  HandCoins,
  Wallet,
  ChartPie,
  MonitorCheck,
  FileSpreadsheet,
  ContactRound,
  ChartBarBig,
  File,
  FileText,
  UserRoundPen,
  UserPlus,
  FolderClosed,
};

export const permissionColors: { [key: string]: string } = {
  VIEW: "bg-blue-500",
  CREATE: "bg-green-500",
  UPDATE: "bg-yellow-500",
  DELETE: "bg-red-500",
  EXPORT: "bg-purple-500",
  IMPORT: "bg-indigo-500",
  DOWNLOAD: "bg-pink-500",
};

export const toOptionalNumber = (val: unknown) => {
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};
interface IProps {
  query: {
    key: string;
    value: string;
  }[];
  router?: any;
  pathname?: string;
  searchParams?: ReadonlyURLSearchParams;
}
export const updateParams = ({ query, router, pathname, searchParams }: IProps) => {
  if (!searchParams) return;

  const params = new URLSearchParams(searchParams.toString());
  if (!isEmpty(query)) {
    query.forEach(item => {
      params.set(item.key, item.value);
    });
  }
  router.push(`${pathname}?${params.toString()}`);
};

export const statusHelper = {
  approved: "APPROVED",
  pending: "PENDING",
  reverted: "REVERTED",
  resubmitted: "RESUBMITTED",
  completed: "COMPLETED",
  under_review: "UNDER_REVIEW",
};

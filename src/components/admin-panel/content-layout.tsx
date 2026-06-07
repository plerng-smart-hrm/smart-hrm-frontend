import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  backHref?: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, backHref, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} backHref={backHref} />
      <div className="w-full pt-2 pb-8 px-8 sm:px-4">{children}</div>
    </div>
  );
}

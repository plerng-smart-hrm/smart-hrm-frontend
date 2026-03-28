"use client";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-16" : "w-60",
        settings.disabled && "hidden",
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative  flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            {/* Show the large image when the sidebar is open */}
            <div className={cn(!getOpenState() ? "hidden" : "block")}>
              <Image
                src="/logo/logo.png"
                alt="SDF Logo"
                className="mr-1 w-[100px] h-[100px]"
                width={164}
                height={164}
              />
            </div>

            <div className={cn(getOpenState() ? "hidden" : "block")}>
              <Image
                src="/logo/logo.png"
                alt="SDF Logo"
                className="mr-1 w-[100px] h-[100px]"
                width={50}
                height={50}
              />
            </div>
          </Link>
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}

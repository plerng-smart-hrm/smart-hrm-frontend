import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";

interface NavbarProps {
    title: string;
    backHref?: string;
}

export function Navbar({ title, backHref }: NavbarProps) {
    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                    {backHref && (
                        <Link href={backHref}>
                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors cursor-pointer"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </button>
                        </Link>
                    )}
                    <h1 className="font-bold">{title}</h1>
                </div>
                <div className="flex flex-1 items-center justify-end">
                    <ModeToggle />
                    <UserNav />
                </div>
            </div>
        </header>
    );
}

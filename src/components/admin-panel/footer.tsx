import Link from "next/link";

export function Footer() {
    return (
        <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-4 md:mx-8 flex h-14 items-center">
                <small className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
                    Any problem? Contact to developer on{" "}
                    <Link
                        href="https://t.me/korngsamnang"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Telegram
                    </Link>
                    .
                </small>
            </div>
        </div>
    );
}

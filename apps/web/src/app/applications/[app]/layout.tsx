"use client";

import { ApplicationBreadcrumbs } from "$web/components/application-breadcrumbs";
import { ModeToggle } from "$web/components/mode-toggle";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
    const params = useParams<{ app: string }>();
    return (
        <div className="flex flex-col h-screen">
            <ApplicationBreadcrumbs />
            <div className="grid grid-cols-12 flex-grow">
                <nav className="col-span-3 bg-primary-foreground p-4 border-r-[0.5px] flex flex-col justify-between">
                    <ul className="flex flex-col gap-4 text-primary">
                        {/* <li>
                            <Link href="/applications" className="flex items-center gap-2">
                                <ChevronLeft className="h-4 w-4" />
                                <span>Back</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link href={`/applications/${params.app}/users`}>Users</Link>
                        </li>
                    </ul>
                    <div>
                        <ModeToggle />
                    </div>
                </nav>
                <main className="col-span-9 mx-auto w-full">{children}</main>
            </div>
        </div>
    );
}

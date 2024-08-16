"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
    const params = useParams<{ app: string }>();
    return (
        <div className="grid grid-cols-12 gap-4 h-screen">
            <nav className="col-span-2 bg-primary-foreground p-4 border-r-[0.5px] border-primary/15">
                <ul className="flex flex-col gap-4 text-primary">
                    <li>
                        <Link href="/applications" className="flex items-center gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            <span>Back</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/applications/${params.app}/users`}>Users</Link>
                    </li>
                </ul>
            </nav>
            <main className="col-span-10 mx-auto w-full px-4 sm:px-6 lg:px-8 p-4">{children}</main>
        </div>
    );
}

import Link from "next/link";

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-12 gap-4 h-screen">
            <nav className="col-span-2 bg-primary-foreground p-4 border-r-[0.5px] border-primary/15">
                <ul className="flex flex-col gap-4 text-primary">
                    <li>
                        <Link href="/applications">Applications</Link>
                    </li>
                    {/* Add more nav items here */}
                </ul>
            </nav>
            <main className="col-span-10 mx-auto w-full px-4 sm:px-6 lg:px-8 p-4">{children}</main>
        </div>
    );
}

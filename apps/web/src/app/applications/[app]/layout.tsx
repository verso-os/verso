"use client";

import { ApplicationBreadcrumbs } from "$web/components/application-breadcrumbs";
import { ModeToggle } from "$web/components/mode-toggle";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
    const params = useParams<{ app: string }>();

    const [links] = useState([
        {
            links: [
                {
                    title: "Overview",
                    href: `/applications/${params.app}`,
                },
            ],
        },
        {
            title: "Management",
            links: [
                {
                    title: "Users",
                    href: `/applications/${params.app}/users`,
                },
                {
                    title: "Organizations",
                    href: `/applications/${params.app}/organizations`,
                },
            ],
        },
        {
            title: "Configure",
            links: [
                {
                    title: "Webhooks",
                    href: `/applications/${params.app}/webhooks`,
                },
                {
                    title: "OAuth",
                    href: `/applications/${params.app}/oauth`,
                },
                {
                    title: "Settings",
                    href: `/applications/${params.app}/settings`,
                },
            ],
        },
    ]);

    return (
        <div className="flex flex-col h-screen">
            <ApplicationBreadcrumbs />
            <div className="grid grid-cols-12 flex-grow">
                <nav className="col-span-3 bg-primary-foreground p-4 border-r-[0.5px] flex flex-col justify-between">
                    <Tree links={links} />
                    <div>
                        <ModeToggle />
                    </div>
                </nav>
                <main className="col-span-9 mx-auto w-full">{children}</main>
            </div>
        </div>
    );
}

const Tree = ({ links }: { links: any[] }) => {
    return (
        <ul className="flex flex-col gap-4 text-primary">
            {links.map((link) => (
                <TreeItem key={link.title} link={link} />
            ))}
        </ul>
    );
};

const TreeItem = ({ link }: { link: any }) => {
    return (
        <li>
            {link.title && <span className="text-xs tracking-wider ml-2 font-light">{link.title}</span>}
            {link.links && (
                <ul>
                    {link.links.map((subLink: any) => (
                        <Link
                            key={subLink.title}
                            href={subLink.href}
                            className="block text-sm hover:bg-foreground/5 duration-100 rounded-md p-2 cursor-pointer font-normal"
                        >
                            <li>{subLink.title}</li>
                        </Link>
                    ))}
                </ul>
            )}
        </li>
    );
};

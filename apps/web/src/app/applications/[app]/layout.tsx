"use client";

import { Building, Home, KeyRound, Settings, Users, Webhook } from "lucide-react";

import { ApplicationBreadcrumbs } from "$web/components/application-breadcrumbs";
import Link from "next/link";
import { ModeToggle } from "$web/components/mode-toggle";
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
                    icon: Home
                },
            ],
        },
        {
            title: "Management",
            links: [
                {
                    title: "Users",
                    href: `/applications/${params.app}/users`,
                    icon: Users
                },
                {
                    title: "Organizations",
                    href: `/applications/${params.app}/organizations`,
                    icon: Building
                },
            ],
        },
        {
            title: "Configure",
            links: [
                {
                    title: "Webhooks",
                    href: `/applications/${params.app}/webhooks`,
                    icon: Webhook
                },
                {
                    title: "OAuth",
                    href: `/applications/${params.app}/oauth`,
                    icon: KeyRound
                },
                {
                    title: "Settings",
                    href: `/applications/${params.app}/settings`,
                    icon: Settings
                },
            ],
        },
    ]);

    return (
        <div className="flex flex-col h-screen">
            <ApplicationBreadcrumbs />
            <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] flex-grow">
                <nav className="bg-primary-foreground p-4 border-r-[0.5px] flex flex-col justify-between">
                    <Tree links={links} />
                    <div>
                        <ModeToggle />
                    </div>
                </nav>
                <main className="mx-auto w-full">{children}</main>
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
                            <li className="flex gap-1">
                                {subLink.icon && <subLink.icon className="w-4 h-4 mr-2" />}
                                {subLink.title}
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </li>
    );
};

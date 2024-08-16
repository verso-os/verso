"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useApplicationsQuery } from "$web/hooks/api/useApplicationsQuery";

export function ApplicationsPageClient() {
    const { data } = useApplicationsQuery();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl py-6 font-bold text-primary">Applications</h1>
            <div className="grid md:grid-cols-4 gap-4">
                {data?.map((app) => (
                    <Link
                        href={`/applications/${app.id}`}
                        key={app.id}
                        className="bg-muted p-8 rounded-xl hover:bg-primary/10"
                    >
                        <h2 className="font-bold text-xl">{app.name}</h2>
                        <div>
                            <span className="text-sm text-primary/50">Last updated</span>
                            <h3 className="text-sm text-primary">
                                {new Date(app.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </h3>
                        </div>
                    </Link>
                ))}
                <Link
                    href="/applications/new"
                    className="bg-muted p-8 rounded-xl hover:bg-primary/10 grid place-items-center"
                >
                    <Plus className="text-foreground" width={52} height={52} opacity={0.25} />
                </Link>
            </div>
        </div>
    );
}

"use client";

import { api } from "$web/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Home() {
    const { data } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await api.v1.app.$get();
            return res.json();
        },
    });

    return (
        <>
            <h1 className="text-4xl py-6 font-bold text-primary">Applications</h1>
            <div className="grid lg:grid-cols-5">
                {data?.map((app) => (
                    <Link
                        href={`/app/${app.id}`}
                        key={app.id}
                        className="bg-primary-foreground max-w-fit p-8 rounded-xl hover:bg-primary/10"
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
            </div>
        </>
    );
}

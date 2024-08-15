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
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl py-6 font-bold text-neutral-200">Applications</h1>
            <div className="grid lg:grid-cols-5">
                {data?.map((app) => (
                    <Link
                        href={`/app/${app.id}`}
                        key={app.id}
                        className="bg-neutral-800 max-w-fit p-8 rounded-xl hover:bg-neutral-700"
                    >
                        <h2 className="font-medium text-xl">{app.name}</h2>
                        <div>
                            <span className="text-sm text-neutral-500">Last updated</span>
                            <h3 className="text-sm text-neutral-200">
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
        </main>
    );
}

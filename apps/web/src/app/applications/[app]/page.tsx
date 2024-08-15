"use client";

import { api } from "$web/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function ApplicationPage({ params }: { params: { app: string } }) {
    const { data, isLoading } = useQuery({
        queryKey: ["application", params.app],
        queryFn: async () => {
            const res = await api.v1.app[":app"].$get({
                param: {
                    app: params.app,
                },
            });
            return res.json();
        },
    });

    if (isLoading || !data) {
        return <h1>Loading...</h1>;
    }

    if ("error" in data) {
        return <h1>Error: {data.error}</h1>;
    }

    console.log(data);

    return <h1>Application {data.name}</h1>;
}

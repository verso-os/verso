"use client";

import { api } from "$web/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function ApplicationPage({ params }: { params: { app: string } }) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["application", params.app],
        queryFn: async () => {
            const res = await api.v1.app[":app"].$get({
                param: {
                    app: params.app,
                },
            });

            if (res.status === 200) {
                return res.json();
            }

            const { error } = await res.json();

            throw new Error(error);
        },
    });

    if (error) {
        return <h1>Error: {error.message}</h1>;
    }

    if (isLoading || !data) {
        return <h1>Loading...</h1>;
    }

    return <h1>Application {data.name}</h1>;
}

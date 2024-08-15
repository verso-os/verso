"use client";

import Image from "next/image";
import { api } from "$web/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const { data } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await api.v1.app.$get();
            return res.json();
        },
    });

    console.log(data);
    return (
        <main className="l">
            <h1>test</h1>
        </main>
    );
}

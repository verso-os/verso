"use client";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import Image from "next/image";

export default function Home() {
    const { data } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const response = await ky.get("/api/applications/").json();
            return response;
        },
    });

    console.log(data);
    return (
        <main className="l">
            <h1>test</h1>
        </main>
    );
}

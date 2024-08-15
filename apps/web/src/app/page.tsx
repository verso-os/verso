"use client";

import { api } from "$web/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Home() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav>
                <ul className="flex gap-4 text-neutral-200">
                    <li>
                        <Link href="/applications">Applications</Link>
                    </li>
                </ul>
            </nav>
        </main>
    );
}

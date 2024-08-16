"use client";

import ApplicationDashboardChart from "$web/components/application-dashboard-chart";
import { useApplicationQuery } from "$web/hooks/api/useApplicationQuery";
import Link from "next/link";

export function ApplicationPageClient({ params }: { params: { app: string } }) {
    const { data: application } = useApplicationQuery(params.app);
    return (
        <div>
            <ApplicationDashboardChart />
            <ul>
                <Link href={`/applications/${params.app}/users`}>Users</Link>
            </ul>
            <h1>Application {application?.name}</h1>
        </div>
    );
}

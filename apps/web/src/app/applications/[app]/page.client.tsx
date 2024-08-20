"use client";

import ApplicationDashboardChart from "$web/components/application-dashboard-chart";
import { useApplicationQuery } from "$web/hooks/api/useApplicationQuery";
import Link from "next/link";

export function ApplicationPageClient({ params }: { params: { app: string } }) {
    const { data: application } = useApplicationQuery(params.app);
    return (
        <div>
            <h1 className="text-4xl py-6 font-bold text-primary">Application {application?.name}</h1>
            <ApplicationDashboardChart data={application?.users_created} />
        </div>
    );
}

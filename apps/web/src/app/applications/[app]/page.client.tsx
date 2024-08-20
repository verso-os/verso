"use client";

import ApplicationDashboardChart from "$web/components/application-dashboard-chart";
import { useApplicationQuery } from "$web/hooks/api/useApplicationQuery";

export function ApplicationPageClient({ params }: { params: { app: string } }) {
    const { data: application } = useApplicationQuery(params.app);

    if (!application) {
        return null;
    }

    return (
        <div>
            <h1 className="text-4xl py-6 font-bold text-primary">Home</h1>
            <ApplicationDashboardChart data={application?.users_created} />
        </div>
    );
}

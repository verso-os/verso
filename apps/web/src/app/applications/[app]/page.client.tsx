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
            <div className="border-b p-4">
                <h1 className="py-0 text-muted-foreground">Overview</h1>
            </div>
            <div className="p-4">
                <ApplicationDashboardChart />
            </div>
        </div>
    );
}

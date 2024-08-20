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
                <h1 className="py-0 font-bold text-primary">Overview</h1>
            </div>
            <div className="p-4">
                <ApplicationDashboardChart data={application?.users_created} />
            </div>
        </div>
    );
}

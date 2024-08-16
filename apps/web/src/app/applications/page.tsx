import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { ApplicationsPageClient } from "$web/app/applications/page.client";
import { prefetchApplicationsQuery } from "$web/hooks/api/useApplicationsQuery";

export default async function ApplicationsPageServer() {
    const queryClient = new QueryClient();

    await prefetchApplicationsQuery(queryClient);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ApplicationsPageClient />
        </HydrationBoundary>
    );
}

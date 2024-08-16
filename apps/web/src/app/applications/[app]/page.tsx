import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { ApplicationPageClient } from "./page.client";
import { prefetchApplicationQuery } from "$web/hooks/api/useApplicationQuery";

export default async function ApplicationPageServer({ params }: { params: { app: string } }) {
    const queryClient = new QueryClient();

    await prefetchApplicationQuery(queryClient, params.app);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ApplicationPageClient params={params} />
        </HydrationBoundary>
    );
}

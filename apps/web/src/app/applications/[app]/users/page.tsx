import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { UsersPageClient } from "./page.client";
import { prefetchApplicationQuery } from "$web/hooks/api/useApplicationQuery";

export default async function UsersPageServer({ params }: { params: { app: string } }) {
    const queryClient = new QueryClient();

    await prefetchApplicationQuery(queryClient, params.app);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UsersPageClient params={params} />
        </HydrationBoundary>
    );
}

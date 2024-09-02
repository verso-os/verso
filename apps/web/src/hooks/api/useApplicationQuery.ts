import { QueryClient, useQuery } from "@tanstack/react-query";
import { api } from "$web/lib/api";

export const getApplication = async (app: string) => {
    const res = await api.v1.app[":app"].$get({
        query: {
            by: "created_at_day",
            start: "week",
        },
        param: { app: app },
    });

    if (res.status === 200) {
        return res.json();
    }

    const { error } = await res.json();

    throw new Error(error);
};

export const prefetchApplicationQuery = async (queryClient: QueryClient, app: string) => {
    await queryClient.prefetchQuery({
        queryKey: ["application", app],
        queryFn: async ({ queryKey }) => {
            const [_, appParam] = queryKey;
            return getApplication(appParam);
        },
    });
};

export const useApplicationQuery = (app: string) => {
    return useQuery({
        queryKey: ["application", app],
        queryFn: async ({ queryKey }) => {
            const [_, appParam] = queryKey;
            return getApplication(appParam);
        },
    });
};

import { QueryClient, useQuery } from "@tanstack/react-query";
import { api } from "$web/lib/api";

export const getApplicationUsers = async (app: string) => {
    const res = await api.v1.app[":app"].users.$get({
        param: {
            app: app,
        },
    });

    if (res.status === 200) {
        return res.json();
    }

    const { error } = await res.json();

    throw new Error(error);
};

export const prefetchApplicationUsersQuery = async (queryClient: QueryClient, app: string) => {
    await queryClient.prefetchQuery({
        queryKey: ["applicationUsers", app],
        queryFn: async ({ queryKey }) => {
            const [_, appParam] = queryKey;
            return getApplicationUsers(appParam);
        },
    });
};

export const useApplicationUsersQuery = (app: string) => {
    return useQuery({
        queryKey: ["applicationUsers", app],
        queryFn: async ({ queryKey }) => {
            const [_, appParam] = queryKey;
            return getApplicationUsers(appParam);
        },
    });
};

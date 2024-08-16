import { QueryClient, useQuery } from "@tanstack/react-query";

import { api } from "$web/lib/api";

export const getApplications = async () => {
    return api.v1.app.$get().then((res) => res.json());
};

export const prefetchApplicationsQuery = async (queryClient: QueryClient) => {
    await queryClient.prefetchQuery({
        queryKey: ["applications"],
        queryFn: getApplications,
    });
};

export const useApplicationsQuery = () => {
    return useQuery({
        queryKey: ["applications"],
        queryFn: getApplications,
    });
};

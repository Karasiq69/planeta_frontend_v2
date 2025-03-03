import {dehydrate, HydrationBoundary, QueryClient,} from "@tanstack/react-query";
import React from "react";
import {carQueryKeys} from "@/features/cars/api/query-keys";
import {getCarBrandsFn} from "@/features/cars/api/actions";

export default async function Hydration({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // this sets the cache time to 5 minutes
            },
        },
    });

    // await queryClient.prefetchQuery({
    //     queryKey: carQueryKeys.brands(),
    //     queryFn: () => getCarBrandsFn(),
    //     staleTime: 60 * 2000,
    // });


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}

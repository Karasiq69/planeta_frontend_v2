import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {ProductsListParams} from "@/features/products/types/params";
import {productsQueryKeys} from "@/features/products/api/query-keys";
import {getAllProductsListFn, getProductById} from "@/features/products/api/actions";


export const useProductsList = (params: ProductsListParams) => {
    return useQuery({
        queryKey: productsQueryKeys.list(params),
        queryFn: ()=>getAllProductsListFn(params),
        gcTime: 1000 * 60 * 20,
        staleTime:1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}

export const useProductById = (id?: number) => {
    return useQuery({
        queryKey: productsQueryKeys.detail(id as number),
        queryFn: () => getProductById(id as number),
        enabled: !!id
    })
}

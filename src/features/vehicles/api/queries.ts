import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {CarListParams} from "@/features/vehicles/types/params";
import {getAllVehiclesListFn, getCarBrandsFn, getCarModelsFn, getVehicleById} from "@/features/vehicles/api/actions";
import {carQueryKeys} from "@/features/vehicles/api/query-keys";
import {ICarModel} from "@/features/vehicles/types";


export const useVehiclesList = (params: CarListParams) => {
    return useQuery({
        queryKey: carQueryKeys.list(params),
        queryFn: () => getAllVehiclesListFn(params),
        gcTime: 1000 * 60 * 20,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}

export const useVehiclesById = (id?: number) => {
    return useQuery({
        queryKey: carQueryKeys.detail(id as number),
        queryFn: () => getVehicleById(id as number),
        enabled: !!id
    })
}

export const useVehiclesBrands = () => {
    return useQuery({
        queryKey: carQueryKeys.brands(),
        queryFn: () => getCarBrandsFn(),
    })
}

export const useVehiclesModels = (brandId?: number) => {
    return useQuery({
        queryKey: carQueryKeys.model(brandId as number),
        queryFn: () => getCarModelsFn(brandId as number),
        enabled: !!brandId
    })
}
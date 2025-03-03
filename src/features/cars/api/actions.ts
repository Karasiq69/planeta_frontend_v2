import apiClient from "@/lib/auth/client";
import {BRANDS_URL, CAR_MODELS_URL, CARS_URL} from "@/lib/constants";
import {CarListParams, ICar, ICarBrand, ICarModel} from "@/features/cars/types";
import {ListResponse} from "@/types/params";

export const getAllVehiclesListFn = async (params: CarListParams): Promise<ListResponse<ICar>> => {
    const res = await apiClient.get<ListResponse<ICar>>(CARS_URL, {
        params
    });
    return res.data;

}
export const getVehicleById = async (id: number): Promise<ICar> => {
    const res = await apiClient.get<ICar>(`${CARS_URL}/${id}`);
    return res.data;
}

export const getCarModelsFn = async (brandId: number) => {
    const response = await apiClient.get<ICarModel[]>(`${CARS_URL}${BRANDS_URL}/${brandId}${CAR_MODELS_URL}/`)
    return response.data;
}

export const getCarBrandsFn = async () => {
    const response = await apiClient.get<ICarBrand[]>(`${CARS_URL}${BRANDS_URL}`)
    return response.data;
}
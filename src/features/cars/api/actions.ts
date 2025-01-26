"use server"
import apiClient from "@/lib/auth/client";
import {BRANDS_URL, CAR_MODELS_URL, CARS_URL} from "@/lib/constants";
import {CarListParams, CarListResponse, ICar, ICarBrand, ICarModel} from "@/features/cars/types";

export const getAllVehiclesListFn = async (params: CarListParams): Promise<CarListResponse> => {
    try {
        const res = await apiClient.get<CarListResponse>(CARS_URL, {
            params
        });
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch clients');
    }
}
export const getVehicleById = async (id: number): Promise<ICar> => {
    try {
        const res = await apiClient.get<ICar>(`${CARS_URL}/${id}`);
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch client');
    }
}

export const getCarModelsFn = async (brandId: number) => {
    const response = await apiClient.get<ICarModel[]>(`${CARS_URL}${BRANDS_URL}/${brandId}${CAR_MODELS_URL}/`)
    return response.data;
}

export const getCarBrandsFn = async () => {
    const response = await apiClient.get<ICarBrand[]>(`${CARS_URL}${BRANDS_URL}`)
    return response.data;
}
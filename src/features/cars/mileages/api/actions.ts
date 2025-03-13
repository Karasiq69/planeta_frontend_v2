import apiClient from "@/lib/auth/client";
import {CARS_URL, MILEAGES_URL} from "@/lib/constants";
import {CreateMileageDTO, IMileage} from "@/features/cars/types";



// Получение всех записей пробега для автомобиля
export const getMileagesByCarId = async (carId: number): Promise<IMileage[]> => {
    const response = await apiClient.get<IMileage[]>(`${MILEAGES_URL}/car/${carId}`);
    return response.data;
};

// Получение последнего пробега автомобиля
export const getLastMileage = async (carId: number): Promise<IMileage> => {
    const response = await apiClient.get<IMileage>(`${MILEAGES_URL}/car/${carId}/last`);
    return response.data;
};

// Получение записи пробега по ID
export const getMileageById = async (id: number): Promise<IMileage> => {
    const response = await apiClient.get<IMileage>(`${MILEAGES_URL}/${id}`);
    return response.data;
};

// Создание новой записи пробега
export const createMileage = async (data: CreateMileageDTO): Promise<IMileage> => {
    const response = await apiClient.post<IMileage>(MILEAGES_URL, data);
    return response.data;
};

// Удаление записи пробега
export const deleteMileage = async (id: number): Promise<void> => {
    await apiClient.delete(`${MILEAGES_URL}/${id}`);
};
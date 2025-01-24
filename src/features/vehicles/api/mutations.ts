import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {IClient} from "@/features/clients/types";
import {clientQueryKeys} from "@/features/clients/api/query-keys";
import apiClient from "@/lib/auth/client";
import {CARS_URL, CLIENTS_URL} from "@/lib/constants";
import {ApiError} from "@/types/api-error";
import {ICar} from "@/features/vehicles/types";
import {carQueryKeys} from "@/features/vehicles/api/query-keys";

export function useCreateCar() {
    const queryClient = useQueryClient();
    const router = useRouter()

    const createCarFn = async (data: Partial<ICar>) => {
        const response = await apiClient.post<ICar>(`${CARS_URL}/`, data);
        return response.data;
    }
    return (
        useMutation({
            mutationFn: createCarFn,
            onSuccess: (createdCar, variables) => {
                toast.success('Автомобиль создан')

                router.push(`${CLIENTS_URL}/${createdCar.id}`);

                queryClient.invalidateQueries({
                    queryKey: carQueryKeys.all
                });
            },
            onError: (error: ApiError) => {
                const errorMessage = error.response?.data?.message || 'Произошла ошибка при создании автомобиля';
                toast.error(errorMessage);
                console.error(error)
            },
            onSettled: () => {

            },
        })
    );
}


export function useEditCar(carId: number) {
    const queryClient = useQueryClient();
    const router = useRouter()

    const editCarFn = async (data: Partial<ICar>) => {
        const response = await apiClient.put<ICar>(`${CARS_URL}/`, data);
        return response.data;
    }
    return (
        useMutation({
            mutationFn: editCarFn,
            onSuccess: (createdCar, variables) => {
                toast.success('Автомобиль создан')
                queryClient.invalidateQueries({
                    queryKey: carQueryKeys.detail(carId)
                });
                queryClient.invalidateQueries({
                    queryKey: carQueryKeys.all
                });
            },
            onError: (error: ApiError) => {
                const errorMessage = error.response?.data?.message || 'Произошла ошибка при изменении автомобиля';
                toast.error(errorMessage);
                console.error(error)
            },
            onSettled: () => {

            },
        })
    );
}
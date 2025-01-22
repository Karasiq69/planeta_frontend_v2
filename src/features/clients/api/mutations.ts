import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {IClient} from "@/features/clients/types";
import {clientQueryKeys} from "@/features/clients/api/query-keys";
import apiClient from "@/lib/auth/client";
import {CLIENTS_URL} from "@/lib/constants";
import {ApiError} from "@/types/api-error";

export function useCreateClient() {
    const queryClient = useQueryClient();
    const router = useRouter()

    const createClientFn = async (data: Partial<IClient>) => {
        const response = await apiClient.post<IClient>(`${CLIENTS_URL}/`, data);
        return response.data;
    }
    return (
        useMutation({
            mutationFn: createClientFn,
            onSuccess: (createdClient, variables) => {
                toast.success('Клиент создан')

                router.push(`${CLIENTS_URL}/${createdClient.id}`);

                queryClient.invalidateQueries({
                    queryKey: clientQueryKeys.all
                });
            },
            onError: (error: ApiError) => {
                const errorMessage = error.response?.data?.message || 'Произошла ошибка при создании клиента';
                toast.error(errorMessage);
            },
            onSettled: () => {

            },
        })
    );
}

export function useEditClient(clientId: number) {
    const queryClient = useQueryClient();

    const editClientFn = async (updatedClient: Partial<IClient>) => {
        const response = await apiClient.put<IClient>(`${CLIENTS_URL}/${clientId}/`, updatedClient);
        return response.data;
    }

    return useMutation({
        mutationFn: editClientFn,
        onSuccess: () => {
            toast.success('Клиент изменен')
            queryClient.invalidateQueries({
                queryKey: clientQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: clientQueryKeys.detail(clientId)
            });
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {

        },
    })
}

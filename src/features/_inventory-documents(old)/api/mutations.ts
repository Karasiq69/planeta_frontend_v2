import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {servicesQueryKeys} from "@/features/services/api/query-keys";
import {createInventoryDocumentFn} from "@/features/inventory-documents/api/actions";
import {CreateInventoryDocument} from "@/features/inventory-documents/types";

export function useCreateInventoryDocument() {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: (data: CreateInventoryDocument) => createInventoryDocumentFn(data),
        onSuccess: () => {
            toast.success('Накладная создана')
        },
        onError: (error) => {
            toast.error(error.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: servicesQueryKeys.all
            });
        },
    })
}

// Хук для создания документа перемещения
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {transferDocumentsQueryKeys} from "@/features/inventory-documents/transfer/api/query-keys";
import {
    addTransferDocumentItem,
    cancelTransferDocument,
    completeTransferDocument,
    createTransferDocumentFn,
    removeTransferDocumentItem,
    updateTransferDocumentFn,
    updateTransferDocumentItem
} from "@/features/inventory-documents/transfer/api/actions";
import {
    CreateTransferDocumentDto,
    UpdateTransferDocumentDto
} from "@/features/inventory-documents/transfer/components/forms/schema";
import {TransferItemDto} from "@/features/inventory-documents/transfer/types";

export const useCreateTransferDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTransferDocumentDto) => createTransferDocumentFn(data),
        onSuccess: (data) => {
            toast.success('Документ на перемещение создан');
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при создании документа: ${error.message}`);
        }
    });
};


// Хук для обновления приходного документа
export const useUpdateTransferDocument = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateTransferDocumentDto) => updateTransferDocumentFn(id, data),
        onSuccess: () => {
            toast.success('Документ обновлен');
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.detail(id)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при обновлении приходного документа: ${error.message}`);
        }
    });
};

// Хук для добавления товара в документ перемещения
export const useAddTransferDocumentItem = (documentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TransferItemDto) => addTransferDocumentItem(documentId, data),
        onSuccess: () => {
            toast.success('Товар добавлен в документ перемещения');
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.detail(documentId)
            });
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.items(documentId)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при добавлении товара в документ перемещения: ${error.message}`);
        }
    });
};

// Хук для обновления товара в документе перемещения
export const useUpdateTransferDocumentItem = (documentId: number, itemId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<TransferItemDto>) => updateTransferDocumentItem(documentId, itemId, data),
        onSuccess: () => {
            toast.success('Товар в документе перемещения обновлен');
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.detail(documentId)
            });
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.items(documentId)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при обновлении товара в документе перемещения: ${error.message}`);
        }
    });
};

// Хук для удаления товара из документа перемещения
export const useRemoveTransferDocumentItem = (documentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: number) => removeTransferDocumentItem(itemId),
        onSuccess: () => {
            toast.success('Товар удален из документа перемещения');
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.detail(documentId)
            });
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.items(documentId)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при удалении товара из документа перемещения: ${error.message}`);
        }
    });
};

// Хук для подтверждения документа перемещения
export const useCompleteTransferDocument = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => completeTransferDocument(id),
        onSuccess: () => {
            toast.success('Документ перемещения подтвержден');
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.detail(id)
            });
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при подтверждении документа перемещения: ${error.message}`);
        }
    });
};

// Хук для отмены документа перемещения
export const useCancelTransferDocument = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => cancelTransferDocument(id),
        onSuccess: () => {
            toast.success('Документ перемещения отменен');
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.detail(id)
            });
            queryClient.invalidateQueries({
                queryKey: transferDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при отмене документа перемещения: ${error.message}`);
        }
    });
};
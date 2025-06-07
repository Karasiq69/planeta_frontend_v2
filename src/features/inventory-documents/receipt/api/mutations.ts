import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {
    addReceiptDocumentItem,
    cancelReceiptDocument,
    completeReceiptDocument,
    createReceiptDocument,
    deleteReceiptDocument,
    removeReceiptDocumentItem,
    updateReceiptDocument,
    updateReceiptDocumentItem
} from "./actions";
import {receiptDocumentsQueryKeys} from "./query-keys";
import {CreateReceiptDocumentDto, ReceiptItemDto, UpdateReceiptDocumentDto} from "@/features/inventory-documents/types";


// Хук для создания приходного документа
export const useCreateReceiptDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReceiptDocumentDto) => createReceiptDocument(data),
        onSuccess: (data) => {
            toast.success('Приходной документ создан');
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при создании приходного документа: ${error.message}`);
        }
    });
};

// Хук для обновления приходного документа
export const useUpdateReceiptDocument = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateReceiptDocumentDto) => updateReceiptDocument(id, data),
        onSuccess: () => {
            toast.success('Приходной документ обновлен');
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.detail(id)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при обновлении приходного документа: ${error.message}`);
        }
    });
};

// Хук для удаления приходного документа
export const useDeleteReceiptDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteReceiptDocument(id),
        onSuccess: () => {
            toast.success('Приходной документ удален');
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при удалении приходного документа: ${error.message}`);
        }
    });
};

// Хук для подтверждения приходного документа
export const useCompleteReceiptDocument = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => completeReceiptDocument(id),
        onSuccess: () => {
            toast.success('Приходной документ подтвержден');
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.detail(id)
            });
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при подтверждении приходного документа: ${error.message}`);
        }
    });
};

// Хук для отмены приходного документа
export const useCancelReceiptDocument = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => cancelReceiptDocument(id),
        onSuccess: () => {
            toast.success('Приходной документ отменен');
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.detail(id)
            });
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при отмене приходного документа: ${error.message}`);
        }
    });
};

// Хук для добавления товара в приходной документ
export const useAddReceiptDocumentItem = (documentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ReceiptItemDto) => addReceiptDocumentItem(documentId, data),
        onSuccess: () => {
            toast.success('Товар добавлен в приходной документ');
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.detail(documentId)
            });
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.items(documentId)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при добавлении товара в приходной документ: ${error.message}`);
        }
    });
};

// Хук для обновления товара в приходном документе
export const useUpdateReceiptDocumentItem = (documentId: number, itemId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<ReceiptItemDto>) => updateReceiptDocumentItem(documentId, itemId, data),
        onSuccess: () => {
            toast.success('Товар в приходном документе обновлен');
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.detail(documentId)
            });
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.items(documentId)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при обновлении товара в приходном документе: ${error.message}`);
        }
    });
};

// Хук для удаления товара из приходного документа
export const useRemoveReceiptDocumentItem = (documentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: number) => removeReceiptDocumentItem(itemId),
        onSuccess: () => {
            toast.success('Товар удален из приходного документа');
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.detail(documentId)
            });
            queryClient.invalidateQueries({
                queryKey: receiptDocumentsQueryKeys.items(documentId)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при удалении товара из приходного документа: ${error.message}`);
        }
    });
};
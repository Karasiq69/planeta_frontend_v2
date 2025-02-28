import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {
    addDocumentItem,
    cancelDocument,
    completeDocument,
    createDraftDocument, deleteDocument,
    removeDocumentItem,
    updateDocument,
    updateDocumentItem
} from "@/features/inventory-documents/api/actions";
import {inventoryDocumentsQueryKeys} from "@/features/inventory-documents/api/query-keys";
import {
    CreateDraftDocumentDTO,
    DocumentItemDTO,
    UpdateDocumentDTO,
    UpdateDocumentItemDTO
} from "@/features/inventory-documents/types";

// Хук для создания черновика документа
export const useCreateDraftDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateDraftDocumentDTO) => createDraftDocument(data),
        onSuccess: () => {
            toast.success('Документ создан');
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при создании документа: ${error.message}`);
        }
    });
};

// Хук для обновления документа
export const useUpdateDocument = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateDocumentDTO) => updateDocument(id, data),
        onSuccess: () => {
            toast.success('Документ обновлен');
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.detail(id)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при обновлении документа: ${error.message}`);
        }
    });
};

// Хук для удаления документа
export const useDeleteDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteDocument(id),
        onSuccess: () => {
            toast.success('Документ удален');
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при удалении документа: ${error.message}`);
        }
    });
};

// Хук для подтверждения документа
export const useCompleteDocument = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => completeDocument(id),
        onSuccess: () => {
            toast.success('Документ подтвержден');
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.detail(id)
            });
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при подтверждении документа: ${error.message}`);
        }
    });
};

// Хук для отмены документа
export const useCancelDocument = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => cancelDocument(id),
        onSuccess: () => {
            toast.success('Документ отменен');
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.detail(id)
            });
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.lists()
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при отмене документа: ${error.message}`);
        }
    });
};

// Хук для добавления товара в документ
export const useAddDocumentItem = (documentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DocumentItemDTO) => addDocumentItem(documentId, data),
        onSuccess: () => {
            toast.success('Товар добавлен');
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.detail(documentId)
            });
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.items(documentId)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при добавлении товара: ${error.message}`);
        }
    });
};

// Хук для обновления товара в документе
export const useUpdateDocumentItem = (documentId: number, itemId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateDocumentItemDTO) => updateDocumentItem(documentId, itemId, data),
        onSuccess: () => {
            toast.success('Товар обновлен');
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.detail(documentId)
            });
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.items(documentId)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при обновлении товара: ${error.message}`);
        }
    });
};

// Хук для удаления товара из документа
export const useRemoveDocumentItem = (documentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: number) => removeDocumentItem(documentId, itemId),
        onSuccess: () => {
            toast.success('Товар удален');
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.detail(documentId)
            });
            queryClient.invalidateQueries({
                queryKey: inventoryDocumentsQueryKeys.items(documentId)
            });
        },
        onError: (error) => {
            toast.error(`Ошибка при удалении товара: ${error.message}`);
        }
    });
};

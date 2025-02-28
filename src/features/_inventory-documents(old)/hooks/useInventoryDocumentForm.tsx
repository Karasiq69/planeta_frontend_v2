import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {InventoryDocument} from "@/features/inventory-documents/types";
import {
    InventoryDocumentFormData,
    inventoryDocumentFormSchema
} from "@/features/inventory-documents/components/forms/schema";
import {useCreateInventoryDocument} from "@/features/inventory-documents/api/mutations";

// Предполагаем, что у нас есть такие типы и API
// Они будут созданы аналогично существующим компонентам
// import { useCreateInventoryDocument, useUpdateInventoryDocument } from "@/features/inventory/api/mutations";



export type InventoryDocumentFormProps = {
    documentData?: InventoryDocument;
    onCreate?: (data: InventoryDocument) => void;
    onUpdate?: (documentId: number) => void;
};

export const useInventoryDocumentForm = ({ documentData, onCreate, onUpdate }: InventoryDocumentFormProps = {}) => {
    const { mutate: createDocument, isPending: isCreating } = useCreateInventoryDocument();
    // const { mutate: updateDocument, isPending: isUpdating } = useUpdateInventoryDocument(documentData?.id);

    // Дефолтные значения из полученных данных документа или пустые значения
    const defaultValues = useMemo(() => ({
        type: documentData?.type || 'RECEIPT',
        warehouseId: documentData?.warehouseId || 1, // TODO fix warehouse id
        targetWarehouseId: documentData?.targetWarehouseId,
        orderId: documentData?.orderId,
        number: documentData?.number || '',
        supplierId: documentData?.supplierId || 1,
        incomingNumber: documentData?.incomingNumber || '',
        incomingDate: documentData?.incomingDate ? new Date(documentData.incomingDate) : undefined,
        note: documentData?.note || '',
        items: documentData?.items || [
            {
                productId: 49,
                quantity: 10,
                toStorageLocationId: 2,
                note: "Перваяadsdas позиция"
            },
            {
                productId: 44,
                quantity: 5,
                toStorageLocationId: 2,
                note: "Вторая позиция"
            }
        ],
    }), [documentData]);

    // Инициализация формы с нашей схемой и значениями по умолчанию
    const form = useForm<InventoryDocumentFormData>({
        resolver: zodResolver(inventoryDocumentFormSchema),
        values: defaultValues,
        mode: "onSubmit"
    });

    // Обработка отправки формы
    const onSubmit = (data: InventoryDocumentFormData) => {
        if (documentData) {
            // Обновление существующего документа
            const updateData = {
                ...data,
                documentId: documentData.id,
                incomingDate: data.incomingDate ? new Date(data.incomingDate) : undefined

            };

            // updateDocument(updateData, {
            //     onSuccess: () => {
            //         toast.success("Документ успешно обновлен");
            //         onUpdate && onUpdate(documentData.id);
            //     },
            //     onError: (error) => {
            //         console.error("Ошибка при обновлении документа:", error);
            //         toast.error("Ошибка при обновлении документа");
            //     }
            // });
        } else {
            // Создание нового документа

            createDocument(data, {
                onSuccess: (data) => {
                    onCreate && onCreate(data);
                },
                onError: (error) => {
                    console.error("Ошибка при создании документа:", error);
                    toast.error("Ошибка при создании документа");
                }
            });
        }
    };

    // const isLoading = isCreating || isUpdating;
    const isLoading = false
    // const isCreating = false
    const isUpdating = false
    console.log(isCreating, isLoading, isUpdating)
    return { form, onSubmit, isLoading, isUpdating, isCreating };
};
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {InventoryDocument, InventoryDocumentDetails} from "../types";
import {useMemo} from "react";
import {
    InventoryDocumentFormData,
    inventoryDocumentFormSchema
} from "@/features/inventory-documents/components/forms/schema";
import {useCreateDraftDocument, useUpdateDocument} from "@/features/inventory-documents/api/mutations";

type UseDocumentFormProps = {
    documentId?: number;
    documentData?: InventoryDocumentDetails;
    onCreate?: (data: InventoryDocument) => void;
    onUpdate?: (documentId: number) => void;
};

export const useDocumentForm = ({
                                    documentId,
                                    documentData,
                                    onCreate,
                                    onUpdate
                                }: UseDocumentFormProps) => {
    const doc = documentData?.document;

    const {mutate: createDocumentMutation, isPending: isCreateDocumentPending} = useCreateDraftDocument();
    const {mutate: updateDocumentMutation, isPending: isUpdateDocumentMutation} = useUpdateDocument(documentId!)

    const isLoading = isCreateDocumentPending || isUpdateDocumentMutation || false;

    const defaultValues = useMemo<InventoryDocumentFormData>(() => {
        return {
            type: doc?.type || 'RECEIPT',
            warehouseId: doc?.warehouseId || 1,
            targetWarehouseId: doc?.targetWarehouseId || undefined,
            orderId: doc?.orderId,
            number: doc?.number || doc?.id.toString() || "" as unknown as string,
            supplierId: doc?.supplierId,
            incomingNumber: doc?.incomingNumber || "",
            note: doc?.note || "",
            incomingDate: doc?.incomingDate ? new Date(doc?.incomingDate) : undefined,
            createdAt: doc?.createdAt ? new Date(doc?.createdAt) : undefined,
            organizationId: doc?.organizationId || undefined,
            // organization: doc?.organization

        }
    }, [doc]);


    // Настройка формы
    const form = useForm<InventoryDocumentFormData>({
        resolver: zodResolver(inventoryDocumentFormSchema),
        defaultValues,
    });


    const onSubmit = (data: InventoryDocumentFormData) => {

        if (documentData) {
            updateDocumentMutation({
                ...data
            }, {
                onSuccess: (data) => onUpdate && onUpdate(data.id)

            })
        } else {
            createDocumentMutation({
                ...data
            }, {
                onSuccess: (data) => onUpdate && onUpdate(data.id)
            })
        }
    }


    return {
        form,
        onSubmit,
        isLoading
    };
};
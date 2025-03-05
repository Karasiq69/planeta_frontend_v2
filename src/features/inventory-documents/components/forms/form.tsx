'use client'
import {Form} from "@/components/ui/form";
import InventoryDocumentFormFields from "./form-fields";
import {InventoryDocument, InventoryDocumentDetails} from "@/features/inventory-documents/types";
import {useDocumentForm} from "@/features/inventory-documents/hooks/useInventoryDocumentForm";

type Props = {
    documentId?: number;
    documentData?: InventoryDocumentDetails;
    onCreate?: (data: InventoryDocument) => void;
    onUpdate?: (documentId: number) => void;
};

const InventoryDocumentForm = ({documentId, documentData, onCreate, onUpdate}: Props) => {
    const {form, onSubmit, isLoading} = useDocumentForm({
        documentId,
        documentData,
        onCreate,
        onUpdate
    });
    return (
        <>
            <Form {...form}>
                <form id={'inventoryDocumentForm'} onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <InventoryDocumentFormFields form={form}/>
                </form>
            </Form>
        </>
    );
};

export default InventoryDocumentForm;
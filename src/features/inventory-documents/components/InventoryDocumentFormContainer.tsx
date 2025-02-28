'use client'
import { useParams } from "next/navigation";
import {useInventoryDocument} from "@/features/inventory-documents/api/queries";
import {InventoryDocumentFormSkeleton} from "@/features/inventory-documents/components/forms/InventoryFormSkeleton";
import InventoryDocumentForm from "@/features/inventory-documents/components/forms/form";

const InventoryDocumentFormContainer = () => {
    const { id } = useParams();
    const documentId = id ? +id : undefined;

    const { data: documentData, isLoading } = useInventoryDocument(documentId as number);

    if (isLoading) {
        return <InventoryDocumentFormSkeleton />;
    }

    return (
        <InventoryDocumentForm
            documentId={documentId}
            documentData={documentData}
        />
    );
};

export default InventoryDocumentFormContainer;
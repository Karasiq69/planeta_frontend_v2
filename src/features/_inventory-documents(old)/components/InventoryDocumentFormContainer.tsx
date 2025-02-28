import {ClientFormSkeleton} from "@/features/clients/components/forms/ClientFormSkeleton";
import InventoryDocumentForm from "@/features/inventory-documents/components/forms/form";
import {useParams, useRouter} from "next/navigation";
import {INVENTORY_DOCUMENTS_URL, WAREHOUSE_URL} from "@/lib/constants";

const InventoryDocumentFormContainer = () => {
    const {id} = useParams();
    const router = useRouter()
    const documentId = id ? +id : undefined;
    // const { data: documentData, isLoading } = useInventoryDocumentById(documentId as number);
    const isLoading = false
    if (isLoading) {
        return <ClientFormSkeleton/>;
    }

    return (



        <InventoryDocumentForm
            documentId={documentId}
            onCreate={(data)=>router.push(`${WAREHOUSE_URL}${INVENTORY_DOCUMENTS_URL}/${data.id}`)}
            // documentData={documentData}
        />
    );
};

export default InventoryDocumentFormContainer;
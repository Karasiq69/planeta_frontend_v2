'use client'
import {Badge} from "@/components/ui/badge";
import {useInventoryDocument} from "@/features/inventory-documents/api/queries";
import {getStatusLabel, getStatusVariant} from "@/features/inventory-documents/helpers/status-helper";

type Props = {
    documentId: number
};
const InventoryDocumentStatusBadge = ({documentId}: Props) => {
    const {data: document, isLoading} = useInventoryDocument(documentId)
    return (
        <div>
            {(!isLoading && document?.document.status) &&
                <Badge variant={getStatusVariant(document?.document?.status)}>
                    {getStatusLabel(document?.document?.status)}
                </Badge>
            }

        </div>
    );
};
export default InventoryDocumentStatusBadge;

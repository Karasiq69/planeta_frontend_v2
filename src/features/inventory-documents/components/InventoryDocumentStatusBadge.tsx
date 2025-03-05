'use client'
import {Badge} from "@/components/ui/badge";
import {useInventoryDocument} from "@/features/inventory-documents/api/queries";
import {getStatusLabel, getStatusVariant} from "@/features/inventory-documents/helpers/status-helper";
import {formatRelativeTime} from "@/lib/format-date";

type Props = {
    documentId: number
};
const InventoryDocumentStatusBadge = ({documentId}: Props) => {
    const {data: document, isLoading} = useInventoryDocument(documentId)
    return (
        <div className={'flex gap-2 items-center'}>
            {(!isLoading && document?.document.status) &&
               <>
                   <Badge variant={getStatusVariant(document?.document?.status)}>
                       {getStatusLabel(document?.document?.status)}
                   </Badge>

                   <span className={'text-xs text-muted-foreground'}>
                       Обновлен: {formatRelativeTime(document.document.updatedAt)}
                   </span>
               </>

            }

        </div>
    );
};
export default InventoryDocumentStatusBadge;

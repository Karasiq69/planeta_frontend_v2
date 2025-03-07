'use client'

import {useInventoryDocument} from "@/features/inventory-documents/api/queries";

type Props = {
    documentId: number
};
const InventoryDocumentsFooter = ({documentId}: Props) => {
    const {data: documentData, isLoading} = useInventoryDocument(documentId);
    if (isLoading) return null
    return (
        <div className={'flex justify-end gap-5 text-xs text-muted-foreground'}>

            <p>
                Всего позиций: {documentData?.items?.length}
            </p>
            <p>
                Сумма: {documentData?.document.totalAmount}
            </p>
        </div>
    );
};
export default InventoryDocumentsFooter;

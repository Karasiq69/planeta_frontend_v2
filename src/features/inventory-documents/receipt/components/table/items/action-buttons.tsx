import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {ReceiptDocumentItem} from "@/features/inventory-documents/types";
import {useRemoveReceiptDocumentItem} from "@/features/inventory-documents/receipt/api/mutations";

type Props = {
    documentItem: ReceiptDocumentItem
};
const ReceiptDocumentsTableActionButtons = ({documentItem}: Props) => {
    const documentId = Number(documentItem?.documentId)

    const {mutate, isPending} = useRemoveReceiptDocumentItem(documentId)
    const handleDelete = () => {
        mutate(documentItem.id)
    }

    return (
        <div className="flex gap-1 justify-end">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"
                    onClick={handleDelete} disabled={isPending}>
                <Trash2 className="h-4 w-4"/>

            </Button>
        </div>
    );
};
export default ReceiptDocumentsTableActionButtons;

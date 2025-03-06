import {useRemoveDocumentItem} from "@/features/inventory-documents/api/mutations";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import {DocumentItem} from "@/features/inventory-documents/types";

type Props = {
    documentItem: DocumentItem
};
const InventoryDocumentsTableActionButtons = ({documentItem}: Props) => {
    const documentId = Number(documentItem?.id)
    const {mutate, isPending} = useRemoveDocumentItem(documentItem.documentId)
    const handleDelete = () => {
        mutate(documentId)
    }

    return (
        <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4"/>
            </Button>
            {/*<Pre object={documentItem}/>*/}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"
                    onClick={handleDelete} disabled={isPending}>
                <Trash2 className="h-4 w-4"/>

            </Button>
        </div>
    );
};
export default InventoryDocumentsTableActionButtons;

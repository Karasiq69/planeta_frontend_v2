'use client'
import {Button} from "@/components/ui/button";
import {CheckCheck, Save} from "lucide-react";
import React from "react";
import {useIsMutating} from "@tanstack/react-query";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {useInventoryDocument} from "@/features/inventory-documents/api/queries";
import {useSetDocumentIsComplete} from "@/features/inventory-documents/api/mutations";
import {InventoryDocumentStatus} from "@/features/inventory-documents/types";

type Props = {
    documentId: number
};
const InventoryDocumentSubmitButton = ({documentId}: Props) => {
    const isMutating = useIsMutating()
    const {data, isLoading} = useInventoryDocument(documentId)
    const {mutate: setDocumentisComplete, isPending: isCompletingPending} = useSetDocumentIsComplete(documentId)
    const setIsComplete = () => {
        setDocumentisComplete()
    }

    const isDocumentEditable = data?.document.status === InventoryDocumentStatus.DRAFT
    return (
        <>
            {isDocumentEditable &&
            <>
                <Button
                    type={'button'}
                    size={'sm'}
                    // form={'inventoryDocumentForm'}
                    onClick={setIsComplete}
                    disabled={isCompletingPending}
                >
                    {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground"/> : <CheckCheck/>}
                    Сохранить и провести
                </Button>
                <Button
                    type={'submit'}
                    size={'sm'}
                    form={'inventoryDocumentForm'}
                    variant={'outline'}
                    disabled={isMutating > 0}
                >
                    {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground"/> : <Save/>}
                    Сохранить черновик
                </Button>
            </>
            }


        </>

    );
};
export default InventoryDocumentSubmitButton;

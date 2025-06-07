'use client'
import {Button} from "@/components/ui/button";
import {CheckCheck, Save} from "lucide-react";
import React from "react";
import {useIsMutating} from "@tanstack/react-query";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {useReceiptDocument} from "@/features/inventory-documents/receipt/api/queries";
import {InventoryDocumentStatus} from "@/features/inventory-documents/types";
import {useCompleteReceiptDocument} from "@/features/inventory-documents/receipt/api/mutations";
import {useTransferDocument} from "@/features/inventory-documents/transfer/api/queries";
import {useCompleteTransferDocument} from "@/features/inventory-documents/transfer/api/mutations";

type Props = {
    documentId: number
};

const ReceiptSubmitButton = ({documentId}: Props) => {
    const isMutating = useIsMutating()
    const {data} = useTransferDocument(documentId)
    const {mutate: setDocumentisComplete, isPending: isCompletingPending} = useCompleteTransferDocument(documentId)
    const setIsComplete = () => {
        setDocumentisComplete()
    }

    const isDocumentEditable = data?.status === InventoryDocumentStatus.DRAFT
    return (
        <>
            {isDocumentEditable &&
                <>
                    <Button
                        type={'button'}
                        size={'sm'}
                        onClick={setIsComplete}
                        disabled={isCompletingPending}
                    >
                        {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground"/> : <CheckCheck/>}
                        Сохранить и провести
                    </Button>
                    <Button
                        type={'submit'}
                        size={'sm'}
                        form={'transferDocumentForm'}
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
export default ReceiptSubmitButton;

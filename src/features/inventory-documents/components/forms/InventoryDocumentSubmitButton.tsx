'use client'
import {Button} from "@/components/ui/button";
import {CheckCheck, Save} from "lucide-react";
import React from "react";
import {useIsMutating} from "@tanstack/react-query";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {useInventoryDocument} from "@/features/inventory-documents/api/queries";

type Props = {
    docId: number
};
const InventoryDocumentSubmitButton = ({docId}: Props) => {
    const isMutating = useIsMutating()
    const {isLoading} = useInventoryDocument(docId)


    return (
        <>
            <Button
                type={'submit'}
                size={'sm'}
                form={'newsletterForm'}
                disabled={isMutating > 0 || isLoading}
            >
                {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground"/> : <CheckCheck />}
                Сохранить и провести
            </Button>
            <Button
                type={'submit'}
                size={'sm'}
                form={'newsletterForm'}
                variant={'outline'}
                disabled={isMutating > 0}
            >
                {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground"/> : <Save/>}
                Сохранить черновик
            </Button>

        </>

    );
};
export default InventoryDocumentSubmitButton;

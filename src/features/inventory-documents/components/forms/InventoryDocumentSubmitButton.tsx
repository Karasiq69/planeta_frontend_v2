'use client'
import {Button} from "@/components/ui/button";
import {Save} from "lucide-react";
import React from "react";
import {useIsMutating} from "@tanstack/react-query";
import LoaderAnimated from "@/components/ui/LoaderAnimated";

type Props = {
    docId: number
};
const InventoryDocumentSubmitButton = ({docId}: Props) => {
    const isMutating = useIsMutating()


    return (
        <Button
            type={'submit'}
            size={'sm'}
            form={'newsletterForm'}
            disabled={isMutating > 0}
        >
            {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground"/> : <Save/>}
            Сохранить
        </Button>

    );
};
export default InventoryDocumentSubmitButton;

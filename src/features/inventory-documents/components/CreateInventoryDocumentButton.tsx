'use client'
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {InventoryDocumentType} from "@/features/inventory-documents/types";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {useCreateDraftDocument} from "@/features/inventory-documents/api/mutations";
import {SquarePlus} from "lucide-react";
import React from "react";

interface CreateDocumentButtonProps   {
    type?: InventoryDocumentType;
    warehouseId?: number;
    redirectAfterCreate?: boolean;
    onSuccess?: (documentId: number) => void;
}

const CreateDocumentButton = ({
                                  type = InventoryDocumentType.RECEIPT,
                                  warehouseId = 1,
                                  redirectAfterCreate = true,
                                  onSuccess,
                                  ...props
                              }: CreateDocumentButtonProps) => {
    const router = useRouter();
    const { mutateAsync, isPending } = useCreateDraftDocument();

    const handleCreateDocument = async () => {
        try {
            const newDocument = await mutateAsync({
                type,
                warehouseId,
            });

            if (onSuccess && newDocument.id) {
                onSuccess(newDocument.id);
            }

            if (redirectAfterCreate && newDocument.id) {
                router.push(`/inventory-documents/${newDocument.id}`);
            }
        } catch (error) {
            console.error("Failed to create document", error);
        }
    };

    return (
        <Button
            onClick={handleCreateDocument}
            disabled={isPending}
            {...props}
        >
            {isPending ? <LoaderAnimated className="mr-2" /> : <SquarePlus/> }
            Создать документ
        </Button>
    );
};

export default CreateDocumentButton;
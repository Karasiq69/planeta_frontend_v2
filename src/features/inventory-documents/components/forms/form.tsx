'use client'
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import InventoryDocumentFormFields from "./form-fields";
import {InventoryDocument, InventoryDocumentDetails} from "@/features/inventory-documents/types";
import {useDocumentForm} from "@/features/inventory-documents/hooks/useInventoryDocumentForm";

type Props = {
    documentId?: number;
    documentData?: InventoryDocumentDetails;
    onCreate?: (data: InventoryDocument) => void;
    onUpdate?: (documentId: number) => void;
};

const InventoryDocumentForm = ({documentId, documentData, onCreate, onUpdate}: Props) => {
    const {form, onSubmit, isLoading} = useDocumentForm({
        documentId,
        documentData,
        onCreate,
        onUpdate
    });
    return (
        <>
            <Form {...form}>
                <form id={'newsletterForm'} onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <InventoryDocumentFormFields form={form}/>

                    {/*<div className="flex justify-end gap-3">*/}
                    {/*    <Button*/}
                    {/*        disabled={isLoading || false}*/}
                    {/*        variant="default"*/}
                    {/*        type="submit"*/}
                    {/*    >*/}
                    {/*        {documentId ? 'Сохранить' : 'Создать'}*/}
                    {/*        {isLoading && <LoaderAnimated className="text-white ml-2"/>}*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </form>
            </Form>
        </>
    );
};

export default InventoryDocumentForm;
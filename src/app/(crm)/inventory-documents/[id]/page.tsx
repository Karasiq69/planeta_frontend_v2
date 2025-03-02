import InventoryDocumentFormContainer from "@/features/inventory-documents/components/InventoryDocumentFormContainer";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import React from "react";
import InventoryDocumentsProductsContainer
    from "@/features/inventory-documents/components/InventoryDocumentsProductsContainer";
import {Button} from "@/components/ui/button";
import {Printer, Trash2} from "lucide-react";
import InventoryDocumentSubmitButton
    from "@/features/inventory-documents/components/forms/InventoryDocumentSubmitButton";
import PageHeader from "@/components/common/PageHeader";
import InventoryDocumentStatusBadge from "@/features/inventory-documents/components/InventoryDocumentStatusBadge";

const Page = async ({
                        params,
                    }: {
    params: { [key: string]: string | string[] | undefined };
}) => {
    const docId = Number(params.id)

    return (
        <div className={'space-y-5'}>
            <section>
                <div className={'flex justify-between items-center'}>
                    <div className={'flex justify-between items-center gap-5'}>
                        <PageHeader title={`Приходная накладная №${docId}`} showBackButton/>
                        <InventoryDocumentStatusBadge documentId={docId}/>
                    </div>
                    <div className="space-x-3">
                        <InventoryDocumentSubmitButton docId={docId}/>

                        <Button variant="outline" size={'sm'}><Printer size={16}/></Button>
                        <Button variant="destructive" size={'sm'}><Trash2 size={16}/></Button>
                    </div>

                </div>
            </section>

            <Card>
                <CardHeader className={'max-w-6xl'}>
                    <InventoryDocumentFormContainer/>
                </CardHeader>

                <Separator/>
                <CardContent className={'bg-muted'}>
                    <InventoryDocumentsProductsContainer/>
                </CardContent>

            </Card>
        </div>

    );
};
export default Page;

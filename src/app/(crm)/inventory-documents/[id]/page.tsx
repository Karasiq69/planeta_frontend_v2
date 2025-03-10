import InventoryDocumentFormContainer from "@/features/inventory-documents/components/InventoryDocumentFormContainer";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {Button} from "@/components/ui/button";
import {Printer, Trash2} from "lucide-react";
import InventoryDocumentSubmitButton
    from "@/features/inventory-documents/components/forms/InventoryDocumentSubmitButton";
import PageHeader from "@/components/common/PageHeader";
import InventoryDocumentStatusBadge from "@/features/inventory-documents/components/InventoryDocumentStatusBadge";
import InventoryDocumentsFooter from "@/features/inventory-documents/components/InventoryDocumentsFooter";
import InventoryDocumentsProductsContainer
    from "@/features/inventory-documents/components/InventoryDocumentsProductsContainer";

const Page = async ({
                        params,
                    }: {
    params: { [key: string]: string | string[] | undefined };
}) => {
    const docId = Number(params.id)

    return (
        <div className={'space-y-5 w-full overflow-y-hidden  min-w-full'}>
            <section className={'flex flex-col lg:flex-row gap-3 lg:justify-between'}>

                <div className={'flex flex-wrap gap-5'}>
                    <PageHeader title={`Приходная накладная №${docId}`} showBackButton/>
                    <InventoryDocumentStatusBadge documentId={docId}/>
                </div>

                <div className="flex gap-3 flex-wrap">
                    <InventoryDocumentSubmitButton documentId={docId}/>

                    <Button variant="outline" size={'sm'}><Printer size={16}/></Button>
                    <Button disabled variant="destructive" size={'sm'}><Trash2 size={16}/></Button>
                </div>

            </section>

            <Card>
                <CardHeader className={''}>
                    <InventoryDocumentFormContainer/>
                </CardHeader>

                <Separator/>
                <CardContent className={'bg-muted rounded-lg space-y-3 overflow-x-auto'}>
                    <InventoryDocumentsProductsContainer/>
                    <InventoryDocumentsFooter documentId={docId}/>
                </CardContent>

            </Card>
        </div>

    );
};
export default Page;

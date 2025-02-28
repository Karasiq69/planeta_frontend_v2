import InventoryDocumentFormContainer from "@/features/inventory-documents/components/InventoryDocumentFormContainer";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import React from "react";
import InventoryDocumentsProductsContainer
    from "@/features/inventory-documents/components/InventoryDocumentsProductsContainer";
import {Button} from "@/components/ui/button";
import GoBackButton from "@/components/common/GoBackButton";
import {Badge} from "@/components/ui/badge";
import {Printer, Trash2} from "lucide-react";
import InventoryDocumentSubmitButton
    from "@/features/inventory-documents/components/forms/InventoryDocumentSubmitButton";
import PageHeader from "@/components/common/PageHeader";

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
                   <PageHeader title={`Приходная накладная №${docId}`} showBackButton/>

                    <div className="space-x-4">
                        <InventoryDocumentSubmitButton docId={docId}/>

                        <Button variant="outline" size={'sm'}><Printer size={16}/></Button>
                        <Button variant="ghost" size={'sm'}><Trash2 size={16}/> Удалить заказ</Button>
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

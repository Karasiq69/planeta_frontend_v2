import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {Button} from "@/components/ui/button";
import {Printer, Trash2} from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import TransferFormContainer from "@/features/inventory-documents/transfer/components/TransferFormContainer";
import TransferItemsContainer from "@/features/inventory-documents/transfer/components/TransferItemsContainer";
import TransferSubmitButton from "@/features/inventory-documents/transfer/components/forms/TransferSubmitButton";

const Page = async (
    props: {
        params: Promise<{ [key: string]: string | string[] | undefined }>;
    }
) => {
    const params = await props.params;
    const docId = Number(params.id)

    return (
        <div className={'space-y-5 w-full overflow-y-hidden  min-w-full'}>
            <section className={'flex flex-col lg:flex-row gap-3 lg:justify-between'}>

                <div className={'flex flex-wrap gap-5'}>
                    <PageHeader title={`Перемещение запасов №${docId}`} showBackButton/>
                </div>

                <div className="flex gap-3 flex-wrap">
                    <TransferSubmitButton documentId={docId}/>

                    <Button variant="outline" size={'sm'}><Printer size={16}/></Button>
                    <Button disabled variant="destructive" size={'sm'}><Trash2 size={16}/></Button>
                </div>
            </section>

            <Card>
                <CardHeader>
                    <TransferFormContainer documentId={docId}/>
                </CardHeader>

                <Separator/>
                <CardContent className={'bg-muted rounded-lg space-y-3 overflow-x-auto'}>
                    <TransferItemsContainer documentId={docId}/>
                    {/*<InventoryDocumentsFooter documentId={docId}/>*/}
                </CardContent>

            </Card>
        </div>
    );
};
export default Page;

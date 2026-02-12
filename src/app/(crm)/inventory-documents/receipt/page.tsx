import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import React, {Suspense} from "react";
import {Button} from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import InventoryDocumentsReceiptDatatable
    from "@/features/inventory-documents/receipt/components/table/InventoryDocumentsReceiptDatatable";
import CreateReceiptDocumentButton from "@/features/inventory-documents/receipt/components/CreateReceiptDocumentButton";

type Props = {};
const Page = (props: Props) => {

    return (
        <section>
            <div className={'space-y-5'}>
                <PageHeader title={'Приходные накладные'} showBackButton={false}/>

                <div className={'flex gap-5 items-center'}>
                    <CreateReceiptDocumentButton redirectAfterCreate={true}/>

                    <Button variant={'outline'} disabled>Что-то еще сделать</Button>
                </div>
                <Card>
                    <InventoryDocumentsReceiptDatatable/>

                </Card>
            </div>
        </section>
    );
};
export default Page;
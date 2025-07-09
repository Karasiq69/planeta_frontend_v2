import {Card, CardContent, CardHeader} from "@/components/ui/card";
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import CreateTransferDocumentButton from "@/features/inventory-documents/transfer/components/CreateTransferDocument";
import InventoryDocumentsTransferDatatable
    from "@/features/inventory-documents/transfer/components/table/InventoryDocumentTransferDatatable";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Перемещения | CRM автосервис",
    description: "",
};
type Props = {};
const Page = (props: Props) => {
    return (
        <section>
            <div className={'space-y-5'}>
                <PageHeader title={'Перемещения товаров'} showBackButton={false}/>

                <div className={'flex gap-5 items-center'}>
                    <CreateTransferDocumentButton redirectAfterCreate={true}/>
                </div>
                <Card>
                    <CardHeader>
                    </CardHeader>

                        <InventoryDocumentsTransferDatatable/>
                </Card>
            </div>
        </section>
    );
};
export default Page;
import {Card} from "@/components/ui/card";
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import InventoryDocumentsReceiptDatatable
    from "@/features/inventory-documents/receipt/components/table/InventoryDocumentsReceiptDatatable";
import CreateReceiptDocumentButton from "@/features/inventory-documents/receipt/components/CreateReceiptDocumentButton";
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: "Приходные накладные",
    description: "CRM автосервис",
};

const Page = () => {

    return (
        <section>
            <div className={'space-y-5'}>
                <PageHeader title={'Приходные накладные'} showBackButton={false}/>

                <div className={'flex gap-5 items-center'}>
                    <CreateReceiptDocumentButton redirectAfterCreate={true}/>
                </div>
                <Card>
                    <InventoryDocumentsReceiptDatatable/>
                </Card>
            </div>
        </section>
    );
};
export default Page;
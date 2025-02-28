'use client'
import React from "react";
import {Button} from "@/components/ui/button";
import {BookDashed, ListChecks} from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import InventoryDocumentFormContainer from "@/features/inventory-documents/components/InventoryDocumentFormContainer";

type Props = {};
const Page = (props: Props) => {
    // console.log(isPending, 'IS PENDING?')
    return (
        <section>
            <div className={'space-y-5'}>


                <PageHeader title={'Создание накладной'} showBackButton/>
                {/*<CreateOrderButton/>*/}
                <div className={'flex gap-5 items-center'}>
                    <Button variant={'default'}
                            type="submit"
                            form={'inventoryDocsForm'}
                            // disabled={isPending}
                    >
                        <ListChecks/>
                        Создать накладную</Button>
                    <Button variant={'outline'} disabled>
                        <BookDashed/>Сохранить как черновик
                    </Button>
                </div>
                <InventoryDocumentFormContainer/>
                {/*<_ReceiptDocumentForm/>*/}


            </div>
            {/*<div className={'mt-40'}>*/}
            {/*    /!*<_ReceiptDocumentForm2/>*!/*/}
            {/*</div>*/}
        </section>
    );
};
export default Page;

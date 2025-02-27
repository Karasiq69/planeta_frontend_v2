'use client'
import {Card} from "@/components/ui/card";
import React, {Suspense} from "react";
import {Button} from "@/components/ui/button";
import WarehouseDataTable from "@/features/warehouse/components/table/warehouse-items/WarehouseDataTable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {BookDashed, FileMinus2, FilePlus2, ListChecks, SquarePlus} from "lucide-react";
import _ReceiptDocumentForm from "@/features/warehouse/components/new-receipt/_ReceiptDocumentForm";
import GoBackButton from "@/components/common/GoBackButton";
import StatusBadge from "@/features/orders/components/StatusBadge";
import {Badge} from "@/components/ui/badge";
import _ReceiptDocumentForm2 from "@/features/warehouse/components/new-receipt/_ReceiptDocumentForm2";
import PageHeader from "@/components/common/PageHeader";

type Props = {};
const Page = (props: Props) => {
    return (
        <section>
            <div className={'space-y-5'}>


                <PageHeader title={'Создание накладной'} showBackButton/>
                {/*<CreateOrderButton/>*/}
                <div className={'flex gap-5 items-center'}>
                    <Button variant={'default'} disabled><ListChecks /> Провести</Button>
                    <Button variant={'outline'} disabled><BookDashed  />Сохранить как черновик</Button>
                </div>
                <_ReceiptDocumentForm/>



            </div>
            <div className={'mt-40'}>
                <_ReceiptDocumentForm2/>
            </div>
        </section>
    );
};
export default Page;

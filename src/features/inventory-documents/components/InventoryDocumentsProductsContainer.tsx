'use client'
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import React, {useMemo} from "react";
import {useDocumentItems} from "@/features/inventory-documents/api/queries";
import {useParams} from "next/navigation";
import DataTableBasic from "@/components/common/table/data-table-basic";
import {DocumentProductsColumnDefs} from "@/features/inventory-documents/components/table/columns-items";
import OrderProductsCombobox from "@/features/order-products/components/OrderProductsCombobox";

type Props = {
    onAddItem?: () => void;
};

const InventoryDocumentsProductDatatable = ({onAddItem}: Props) => {
    const {id} = useParams();
    const docId = Number(id);
    const {data: productItems, isLoading} = useDocumentItems(docId);

    const columns = useMemo(() => DocumentProductsColumnDefs, []);

    const table = useReactTable({
        data: productItems || [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // if (isLoading) return <LoaderSectionAnimated className="bg-background" text="Загружаем товары..."/>;
    // if (!productItems) return <div className="text-center py-8 text-muted-foreground">Данные не найдены</div>;

    return (
        <>
            <div
                className="flex flex-row items-center py-5 justify-between">
                <OrderProductsCombobox orderId={2}/>
            </div>
            <div className="space-y-3 rounded-md p-5 bg-background">
                {isLoading
                    ? <LoaderSectionAnimated className="bg-background" text="Загружаем товары..."/>
                    : <DataTableBasic table={table} columns={columns}/>
                }
            </div>
        </>
    );
};

export default InventoryDocumentsProductDatatable;
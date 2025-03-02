'use client'
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import React, {useMemo} from "react";
import {useDocumentItems} from "@/features/inventory-documents/api/queries";
import {useParams} from "next/navigation";
import DataTableBasic from "@/components/common/table/data-table-basic";
import {DocumentProductsColumnDefs} from "@/features/inventory-documents/components/table/columns-items";
import InventoryDocumentProductsCombobox
    from "@/features/inventory-documents/components/InventoryDocumentProductsCombobox";
import {Product} from "@/features/products/types";
import {useAddDocumentItem} from "@/features/inventory-documents/api/mutations";

type Props = {
    onAddItem?: () => void;
};

const InventoryDocumentsProductContainer = ({onAddItem}: Props) => {
    const {id} = useParams();
    const docId = Number(id);
    const {data: productItems, isLoading} = useDocumentItems(docId);
    const {mutate, isPending} = useAddDocumentItem(docId)
    const columns = useMemo(() => DocumentProductsColumnDefs, []);

    const table = useReactTable({
        data: productItems || [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const onSelectProduct = (product: Product) => {
         mutate({
            productId: product.id,
            quantity: 1
        })
    }


    return (
        <>
            <div
                className="flex flex-row items-center py-5 justify-between">
                <InventoryDocumentProductsCombobox isPending={isPending} onSelectProduct={onSelectProduct}/>
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

export default InventoryDocumentsProductContainer;
'use client'
import * as React from "react";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import {ComboboxSearch} from "@/components/ComboboxSearch";
import {Badge} from "@/components/ui/badge";
import {useAllWarehouseItems} from "@/features/warehouse/api/queries";
import {WarehouseItem} from "@/features/warehouse/types";
import {TransferItemDto} from "../types";

type TransferItemsComboboxProps = {
    onSelectProduct: (warehouseItem: WarehouseItem) => void;
    isPending: boolean
};

const TransferItemsCombobox = ({onSelectProduct, isPending}: TransferItemsComboboxProps) => {
    const {searchTerm, searchError, debouncedHandleSearch} = useDebouncedSearch();

    const {data: warehouseItems, isLoading, isFetching} = useAllWarehouseItems({
        page: 1,
        pageSize: 50,
        searchTerm: searchTerm || undefined
    });

    const handleSelectItem = (item: WarehouseItem) => {
        onSelectProduct(item);
    };

    return (
        <>
            <ComboboxSearch<WarehouseItem>
                data={warehouseItems}
                isLoading={isLoading || isFetching}
                isPending={isPending}
                width={'w-[600px]'}
                onSearch={debouncedHandleSearch}
                onSelect={handleSelectItem}
                getDisplayValue={(warehouseItem) => warehouseItem?.product?.name || `${warehouseItem.id}`}
                renderItem={(warehouseItem) => (
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <span className="grow">{warehouseItem?.product?.name}</span>
                                <span className="text-xs text-muted-foreground grow-0">{warehouseItem?.product?.sku}</span>
                            </div>
                            <Badge variant="outline" className="ml-auto font-normal text-muted-foreground">
                                {warehouseItem?.product?.brand?.name}
                            </Badge>
                        </div>
                    </div>
                )}
                searchError={searchError}
                placeholder="Поиск товаров"
            />
        </>
    );
};

export default TransferItemsCombobox;
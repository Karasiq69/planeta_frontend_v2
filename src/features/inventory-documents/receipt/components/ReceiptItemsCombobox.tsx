'use client'
import * as React from "react";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import {ComboboxSearch} from "@/components/ComboboxSearch";
import {Product} from "@/features/products/types";
import {useProductsList} from "@/features/products/api/queries";
import {Badge} from "@/components/ui/badge";

type InventoryDocumentProductsComboboxProps = {
    onSelectProduct: (product: Product) => void;
    isPending: boolean
};

const ReceiptItemsCombobox = ({onSelectProduct, isPending}: InventoryDocumentProductsComboboxProps) => {
    const {searchTerm, searchError, debouncedHandleSearch} = useDebouncedSearch();

    const {data: products, isLoading, isFetching} = useProductsList({
        page: 1,
        pageSize: 50,
        searchTerm: searchTerm || undefined
    });

    const handleSelectItem = (item: Product) => {
        onSelectProduct(item);
    };

    return (
        <>
            <ComboboxSearch<Product>
                data={products}

                isLoading={isLoading || isFetching}
                isPending={isPending}
                width={'w-[600px]'}
                onSearch={debouncedHandleSearch}
                onSelect={handleSelectItem}
                getDisplayValue={(product) => product.name}
                renderItem={(product) => (
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <span className="grow">{product.name}</span>
                                <span className="text-xs text-muted-foreground grow-0">{product.sku}</span>
                            </div>
                            <Badge variant="outline" className="ml-auto font-normal text-muted-foreground">
                                {product.brand.name}
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

export default ReceiptItemsCombobox;
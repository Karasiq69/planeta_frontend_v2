'use client'
import * as React from "react";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import {ComboboxSearch} from "@/components/ComboboxSearch";
import {Product} from "@/features/products/types";
import {useProductsList} from "@/features/products/api/queries";
import {useCreateOrderProduct} from "@/features/order-products/api/mutations";
import {Badge} from "@/components/ui/badge";
import {formatPrice} from "@/lib/utils";


const OrderProductsCombobox = ({orderId}: { orderId: number }) => {

    const {searchTerm, searchError, debouncedHandleSearch} = useDebouncedSearch()

    const {data: services, isLoading, isFetching} = useProductsList({
        page: 1, pageSize: 50,
        searchTerm: searchTerm || undefined
    })
    const {mutate, isPending} = useCreateOrderProduct(orderId)

    const handleSelectItem = (item: Product) => {
        mutate(item.id)
    }

    return (
        <div>
            <ComboboxSearch<Product>
                data={services}
                isLoading={isLoading || isFetching}
                isPending={isPending}
                width={'w-[600px]'}
                onSearch={debouncedHandleSearch}
                onSelect={handleSelectItem}
                getDisplayValue={(product) => product.name}
                renderItem={(product) => (
                    <div className="w-full max-w-6xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <span className="text-sm text-gray-500  ">{product.partNumber}</span>
                                <span className="font-medium ">{product.name}</span>
                                <span className="font-bold">{formatPrice(product.price)}</span>
                            </div>
                           <div className={'gap-2 flex'}>
                               <span className="text-xs text-muted-foreground grow-0">{product.sku}</span>

                               <Badge variant="outline" className="ml-auto font-normal text-muted-foreground">
                                   {product.brand.name}
                               </Badge>
                           </div>
                        </div>
                    </div>
                )}
                searchError={searchError}
                placeholder="Поиск товаров"

            />
        </div>
    );
};
export default OrderProductsCombobox;

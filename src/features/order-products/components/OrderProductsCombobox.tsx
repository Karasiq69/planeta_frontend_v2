'use client'
import * as React from "react";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import {ComboboxSearch} from "@/components/ComboboxSearch";
import {IService} from "@/features/services/types";
import {Product} from "@/features/products/types";
import {useProductsList} from "@/features/products/api/queries";
import {useCreateOrderProduct} from "@/features/order-products/api/mutations";


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

                onSearch={debouncedHandleSearch}
                onSelect={handleSelectItem}
                getDisplayValue={(product) => product.name}
                renderItem={(product) => (
                    <div className="flex flex-col">
                        <div className="flex w-full  items-center text-nowrap">

                            <div className={'w-full flex-grow'}>
                                <p className=" flex gap-1 items-center justify-between">
                                    <span className={'text-muted-foreground'}>
                                        {product.id}</span>
                                    {product.name}
                                </p>

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

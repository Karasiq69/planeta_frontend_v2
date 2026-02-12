'use client'
import * as React from "react";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import {useAllServices} from "@/features/services/api/queries";
import {ComboboxSearch} from "@/components/ComboboxSearch";
import {useAddOrderService} from "@/features/orders/api/mutations";
import {IService} from "@/features/services/types";


const ServicesCombobox = ({orderId}:{orderId: number}) => {

    const {searchTerm, searchError, debouncedHandleSearch} = useDebouncedSearch()

    const {data: services, isLoading, isFetching} = useAllServices({
        page: 0, pageSize: 50,
        searchTerm: searchTerm || undefined
    })
    const {mutate, isPending} = useAddOrderService(orderId)

    const handleSelectItem = (item: IService) => {
        mutate(item.id)
    }

    return (
        <div>
            <ComboboxSearch<IService>
                data={services}
                isLoading={isLoading || isFetching}
                isPending={isPending}

                onSearch={debouncedHandleSearch}
                onSelect={handleSelectItem}
                getDisplayValue={(service) => service.name}
                renderItem={(service) => (
                    <div className="flex flex-col">
                        <div className="flex w-full  items-center text-nowrap">

                            <div className={'w-full grow'}>
                                <p className=" flex gap-1 items-center justify-between">
                                    <span className={'text-muted-foreground'}>
                                        {service.id}</span>
                                    {service.name}
                                </p>

                            </div>
                        </div>
                    </div>
                )}
                searchError={searchError}
                placeholder="Поиск услуг"

            />
        </div>
    );
};
export default ServicesCombobox;

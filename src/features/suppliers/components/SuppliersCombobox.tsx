import React from 'react';
import { Supplier } from '@/features/suppliers/types';
import { useSuppliers } from '@/features/suppliers/api/queries';
import useDebouncedSearch from "@/hooks/use-debounced-search";
import {AsyncSelect} from "@/components/ui/async-select";
import {BriefcaseBusiness} from "lucide-react";

interface SuppliersComboboxProps {
    onSelect: (supplier: Supplier) => void;
    initialValue?: number;
    isPending?: boolean;
    width?: string | number;
}

const SuppliersCombobox: React.FC<SuppliersComboboxProps> = ({
                                                                 onSelect,
                                                                 initialValue,
                                                                 isPending = false,
                                                                 width = "100%",
                                                             }) => {
    const { searchTerm, debouncedHandleSearch } = useDebouncedSearch();
    const { data: suppliersResponse, isLoading } = useSuppliers({
        page: 1,
        pageSize: 50,
        searchTerm: searchTerm || undefined
    });

    // Simplified fetcher that uses the existing query data
    const fetchSuppliers = async (query?: string) => {
        if (query) {
            debouncedHandleSearch(query);
        }

        return suppliersResponse?.data || [];
    };

    // Handle supplier selection
    const handleSupplierChange = (value: string) => {
        if (value && suppliersResponse?.data) {
            const selectedSupplier = suppliersResponse.data.find(s => s.id.toString() === value);
            if (selectedSupplier) {
                onSelect(selectedSupplier);
            }
        } else if (!value) {
            // Handle clearing the selection
            onSelect({ id: 0 } as Supplier);
        }
    };
//  todo: пофиксить предзагрузку supplier, когда он уже выбран и есть в документе
    return (
        <AsyncSelect<Supplier>
            fetcher={fetchSuppliers}
            renderOption={(supplier) => (
                <div className="flex flex-col w-full">
                    <div className="font-bold">{supplier.name}</div>
                    <div className={'flex items-center justify-between w-full'}>
                        <div className="text-xs text-muted-foreground">{supplier.contactPerson}</div>
                        {supplier.inn && <div className="text-xs text-muted-foreground">ИНН: {supplier.inn}</div>}
                    </div>
                </div>
            )}
            getOptionValue={(supplier) => supplier.id.toString()}
            getDisplayValue={(supplier) => (
                <div className={'[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80'}>
                       <span className="font-medium gap-2" >
                            <BriefcaseBusiness size={16} />
                           {supplier.name}
                       </span>
                    {/*<div className="text-xxs text-muted-foreground">{supplier.contactPerson}</div>*/}
                </div>
            )}
            notFound={<div className="py-6 text-center text-sm">Поставщики не найдены</div>}
            label="Поставщиков"
            placeholder="Поиск поставщика..."
            value={initialValue?.toString() || ""}
            onChange={handleSupplierChange}
            width={''}
            className={'w-(--radix-popover-trigger-width)'}
            disabled={isPending || isLoading}
            triggerClassName={'w-full'}
            clearable={true}
        />
    );
};

export default SuppliersCombobox;
"use client";
import React from "react";
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";


const OrdersSearchBox = ({searchParams}: { searchParams: any }) => {
    const pathname = usePathname();
    const {replace} = useRouter();
    const currentSearchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(currentSearchParams);

        if (term) {
            params.set('searchTerm', term);
        } else {
            params.delete('searchTerm');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className={'p-4'}>
            <Input
                className="w-96"
                placeholder={'Искать заказы...'}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={typeof searchParams.search === 'string' ? searchParams.search : ''}
            />
        </div>
    );
};

export default OrdersSearchBox;
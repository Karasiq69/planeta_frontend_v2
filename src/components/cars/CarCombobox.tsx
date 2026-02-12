'use client'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Search} from "lucide-react";
import * as React from "react";
import useDebouncedSearch from "@/hooks/use-debounced-search";
import {ComboboxSearch} from "@/components/ComboboxSearch";
import {useVehiclesList} from "@/features/cars/api/queries";
import {ICar} from "@/features/cars/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getBrandLogo, getFullModelName} from "@/features/cars/utils";

type Props = {
    handleSelect: (car: ICar) => void
};
const CarCombobox = ({handleSelect}: Props) => {
    const {searchTerm, searchError, debouncedHandleSearch} = useDebouncedSearch()
    const {data: cars, isLoading, isFetching} = useVehiclesList({
        page: 0, pageSize: 50,
        searchTerm: searchTerm || undefined
    })

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className="text-lg flex gap-2 items-center">
                    <Search size={17}/>
                    Поиск автомобиля
                </CardTitle> <CardDescription>
                Найти существующую модель
            </CardDescription>
            </CardHeader>
            <CardContent>
                <ComboboxSearch<ICar>
                    data={cars}
                    isLoading={isLoading || isFetching}
                    onSearch={debouncedHandleSearch}
                    onSelect={handleSelect}
                    getDisplayValue={(car) => car.vin}
                    renderItem={(car) => (
                        <div className="flex flex-col">
                            <div className="flex w-full  items-center text-nowrap">
                                <Avatar className={'rounded-none items-center'}>
                                    <AvatarImage
                                        className={'size-7'}
                                        src={getBrandLogo(car?.brand)}
                                        alt={car.brand?.name || 'Car brand'}
                                    />
                                    <AvatarFallback delayMs={900}>
                                        {car.brand?.name?.charAt(0) || 'B'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={'w-full grow'}>
                                    <p className="font-bold flex gap-1 items-center justify-between">{getFullModelName(car.model)}
                                    <span className={'text-muted-foreground text-xs'}>{car.licensePlate}</span>
                                    </p>
                                    <span className={'text-xs text-muted-foreground '}>{car.vin}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    searchError={searchError}
                    placeholder="Выберите авто..."
                />
            </CardContent>
        </Card>
    );
};
export default CarCombobox;

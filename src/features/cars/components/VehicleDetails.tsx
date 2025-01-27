'use client'

import React from 'react';
import Image from "next/image";
import {getBrandLogo, getFullModelDisplayName} from "@/features/cars/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ICar} from "@/features/cars/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreVertical, Pencil, RefreshCw, Trash2, XCircle} from "lucide-react";

type Props = {
    car: ICar
};

const VehicleDetails = ({car}: Props) => {
    const {brand, model, mileages, year, vin, licensePlate} = car

    return (

        <Card className={' '}>
            <CardHeader>
                <div className={'flex  gap-3 items-center'}>
                    <CardTitle>
                        Данные автомобиля
                    </CardTitle>
                    <Button variant={'ghost'}>
                        Ред.
                    </Button>
                    <Button variant={'link'}>
                        Добавить пробег
                    </Button>
                    <Button variant={'link'}>
                        + Комментарий
                    </Button>
                </div>


            </CardHeader>
            <CardContent className={'flex justify-between items-center'}>
                <ul className={'flex flex-wrap gap-10  items-center justify-start  '}>
                    <li className={'flex items-center align-middle'}>
                        <Image width={20} height={20} src={getBrandLogo(brand)} className={'size-10'}
                               alt={brand.name}/>
                    </li>
                    <VehicleDetailsItem title={'Модель'} field={getFullModelDisplayName(model)}/>
                    <VehicleDetailsItem title={'Год'} field={year}/>
                    <VehicleDetailsItem title={'VIN'} field={vin}/>
                    <VehicleDetailsItem title={'Двигатель'}
                                        field={`${model.engine?.name} ${model.engine?.series}  ${model.engine?.displacement}л.`}/>
                    <VehicleDetailsItem title={'Пробег'} field={`${mileages[0]?.value ?? '-'} км`}/>

                </ul>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white border-2 border-black rounded px-3  ">
                            <span>{licensePlate?.slice(0, 1)}</span>
                            <span className="mx-1 font-mono">{licensePlate?.slice(1, 4)}</span>
                            <span className="mx-1 font-normal">{licensePlate?.slice(4, 6)}</span>
                            <div className="ml-2 flex items-center border-l-2 border-black pl-2">
                                <span className={'font-mono'}>{licensePlate?.slice(6)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>

    )
}

export default VehicleDetails


export const VehicleDetailsItem = ({field, title}: { title?: string, field: any }) => {
    return <li>
        <span className={'text-muted-foreground text-sm'}>{title}</span>
        <p className={'font-medium'}>{field}</p>
    </li>
}
'use client'

import React from 'react';
import Image from "next/image";
import {getBrandLogo, getFullModelDisplayName} from "@/features/cars/utils";
import {useVehicleById} from "@/features/cars/api/queries";

type Props = {
    carId: string
};

const VehicleDetails = ({carId}: Props) => {
    const {data, isLoading} = useVehicleById(+carId)

    if (isLoading)
        return 'loading..'

    if (!data) return null

    const {brand, model, owner, mileages, year, vin, licensePlate} = data

    return (
        <section className={'bg-muted border rounded-md'}>
            <div className={'flex justify-between items-center px-3 py-6'}>
                <ul className={'flex flex-wrap gap-10  items-center  '}>
                    <li className={''}>
                        <Image width={30} height={30} src={getBrandLogo(brand)} className={'size-32'} alt={brand.name}/>
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

                {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
            </div>
        </section>
    )
}

export default VehicleDetails


export const VehicleDetailsItem = ({field, title}: { title?: string, field: any }) => {
    return <li>
        <span className={'text-muted-foreground text-sm'}>{title}</span>
        <p className={'font-bold'}>{field}</p>
    </li>
}
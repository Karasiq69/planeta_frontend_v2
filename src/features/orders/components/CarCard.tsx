import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {getBrandLogo} from "@/features/cars/utils";
import LicensePlate from "@/components/cars/LicensePlate";
import {EllipsisVertical, Gauge} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import {useOrderById} from "@/features/orders/api/queries";

type Props = {};
const CarCard = (props: Props) => {
    const params = useParams()
    const {data, isLoading} = useOrderById(+params.id)

    if (isLoading) return 'loading..'
    if (!data) return 'no order or error'

    const car = data.car

    return (
        <>
            <Card>
                <CardHeader className={'flex flex-row justify-between items-center'}>
                    <div className={'flex flex-row flex-wrap gap-4 items-center'}>
                        <div>
                            <Avatar>
                                <AvatarImage src={getBrandLogo(car.brand)}/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <CardTitle className={'flex items-center gap-2'}>
                                {car.brand.name}
                                <span className={'font-normal text-sm'}> {car.year}</span>
                            </CardTitle>
                            <CardDescription>
                                {car.vin}
                            </CardDescription>
                        </div>
                    </div>
                    <Button variant={'outline'} size={'icon'}>
                        <EllipsisVertical/>
                    </Button>
                </CardHeader>
                <CardContent className={'flex gap-3  justify-between items-center'}>
                    <LicensePlate licensePlate={car.licensePlate}/>
                    <div className={'text-sm text-muted-foreground flex items-center gap-2'}>
                        <Gauge className={'text-muted-foreground'} size={16}/>
                        {car.mileages[0].value} км
                    </div>
                </CardContent>
            </Card>
        </>
    );
};
export default CarCard;

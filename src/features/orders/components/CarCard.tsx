import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {getBrandLogo} from "@/features/cars/utils";
import LicensePlate from "@/components/cars/LicensePlate";
import {EllipsisVertical, Gauge} from "lucide-react";
import {Button} from "@/components/ui/button";

type Props = {};
const CarCard = (props: Props) => {
    return (
        <>
            <Card>
                <CardHeader className={'flex flex-row justify-between items-center'}>
                    <div className={'flex flex-row flex-wrap gap-4 items-center'}>
                        <div>
                            <Avatar>
                                <AvatarImage src={getBrandLogo({name: 'Mercedes-Benz'})}/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <CardTitle className={'flex items-center gap-2'}>
                                Mercedes-Benz W112
                                <span className={'font-normal text-sm'}> 2022</span>
                            </CardTitle>
                            <CardDescription>
                                WISADASD87AS89D7S8
                            </CardDescription>
                        </div>
                    </div>
                    <Button variant={'outline'} size={'icon'}><EllipsisVertical /></Button>
                </CardHeader>
                <CardContent className={'flex gap-3  justify-between items-center'}>
                    <LicensePlate licensePlate={'У293ММ90'}/>
                    <div className={'font-semibold flex items-center gap-2'}>
                        <Gauge className={'text-muted-foreground'} size={16}/>22 039 км
                    </div>
                </CardContent>
            </Card>
        </>
    );
};
export default CarCard;

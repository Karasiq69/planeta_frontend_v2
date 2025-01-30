import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {ClipboardList, EllipsisVertical, UserIcon} from "lucide-react";

type Props = {};
const ClientCard = (props: Props) => {
    return (
        <>
            <Card>
                <CardHeader className={'flex flex-row justify-between items-center'}>
                    <div className={'flex flex-row flex-wrap gap-4 items-center'}>
                        <div>
                            <Avatar>
                                <AvatarImage src={''}/>
                                <AvatarFallback><UserIcon/></AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <CardTitle className={'flex items-center gap-2'}>
                                Иван Петров
                                <span className={'font-normal text-sm'}> VIP</span>
                            </CardTitle>
                            <CardDescription>
                                0982646@mail.ru

                            </CardDescription>
                        </div>
                    </div>
                    <Button variant={'outline'} size={'icon'}><EllipsisVertical/></Button>
                </CardHeader>
                <CardContent className={'flex gap-3  justify-between items-center'}>
                   <span> +7 912 232 93 93</span>
                    <Button variant={'link'} size={'sm'} className={'p-0 font-semibold text-muted-foreground'}>
                        <ClipboardList size={16} />
                        6 заказов</Button>
                </CardContent>
            </Card>
        </>
    );
};
export default ClientCard;

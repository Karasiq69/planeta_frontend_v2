import {Button} from "@/components/ui/button";
import {Printer, Trash2} from "lucide-react";
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import ClientCard from "@/features/orders/components/ClientCard";
import CarCard from "@/features/orders/components/CarCard";
import OrdersTabsWrapper from "@/features/orders/components/OrdersTabsWrapper";
import GoBackButton from "@/components/common/GoBackButton";



const Page = () => {
    return (
        <div className={'space-y-5'}>
            <div>
                <div className={'flex justify-between items-center'}>
                    <div className={'flex gap-5 items-center'}>
                        <GoBackButton
                        />
                        <div>
                            <h3>Заказ №302</h3>

                        </div>
                        <Badge variant={'outline'}>Ожидает оплаты</Badge>
                        <Badge variant={'destructive'}>Не заполнено</Badge>
                    </div>

                    <div className="space-x-4">
                        <Button variant="outline" size={'sm'}><Printer size={16}/></Button>
                        <Button variant="ghost" size={'sm'}><Trash2 size={16}/> Удалить заказ</Button>
                    </div>

                </div>

                <p className={'text-muted-foreground text-sm'}>Создан 24.02.1993 в 18: 06, Петр Иванов</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* left section*/}
                <section className="md:col-span-2 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:min-h-[156px]">
                        <ClientCard/>
                        <CarCard/>
                    </div>
                    <div>
                       <OrdersTabsWrapper/>
                    </div>

                </section>

                {/* right section*/}
                <section className="md:col-span-1 space-y-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Заголовок</CardTitle>
                            <CardDescription>
                                Some descriptionnn
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Some conente
                        </CardContent>
                        <CardFooter>
                            Some footer
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Заголовок</CardTitle>
                            <CardDescription>
                                Some descriptionnn
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Some conente
                        </CardContent>
                        <CardFooter>
                            Some footer
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Заголовок</CardTitle>
                            <CardDescription>
                                Some descriptionnn
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            Some conente
                        </CardContent>
                        <CardFooter>
                            Some footer
                        </CardFooter>
                    </Card><Card>
                    <CardHeader>
                        <CardTitle>Заголовок</CardTitle>
                        <CardDescription>
                            Some descriptionnn
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        Some conente
                    </CardContent>
                    <CardFooter>
                        Some footer
                    </CardFooter>
                </Card>


                </section>
            </div>
        </div>
    );
};
export default Page;

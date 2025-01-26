import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import VehicleDetails from "@/features/cars/components/VehicleDetails";
import {AlertCircle, Bell, Calendar, Car, PenTool, User} from "lucide-react";
import {Badge} from "@/components/ui/badge";

type Props = {
    params: {
        id: string
    }
};
const Page = async ({params}: Props) => {
    return (
        <>
            <section>
                <div className={'space-y-5'}>
                    <h3>Автомобиль
                    </h3>

                    <VehicleDetails carId={params.id}/>
                    <div className={'flex flex-wrap gap-5'}>


                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5"/>
                                    Владелец и контакты
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="font-medium mb-2">Основная информация</h3>
                                        <div className="space-y-2 text-sm">
                                            <p><span className="text-gray-500">ФИО:</span> Иванов Петр Сергеевич</p>
                                            <p><span className="text-gray-500">Телефон:</span> +7 (999) 123-45-67</p>
                                            <p><span className="text-gray-500">Email:</span> ivanov@example.com</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Дополнительно</h3>
                                        <div className="space-y-2 text-sm">
                                            <p><span className="text-gray-500">Предпочтительное время:</span> После
                                                17:00
                                            </p>
                                            <p><span className="text-gray-500">Дата регистрации:</span> 15.03.2023</p>
                                            <div><span className="text-gray-500">Статус:</span> <Badge>VIP
                                                клиент</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* История обслуживания */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PenTool className="w-5 h-5"/>
                                    История обслуживания
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-medium">Замена масла и фильтров</h3>
                                                <p className="text-sm text-gray-500">Выполнено: 12.01.2024</p>
                                            </div>
                                            <Badge variant="secondary">Завершено</Badge>
                                        </div>
                                        <p className="text-sm">Замена моторного масла Shell Helix 5W40, масляного
                                            фильтра,
                                            воздушного фильтра</p>
                                        <p className="text-sm text-gray-500 mt-2">Механик: Петров А.В.</p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-medium">Диагностика подвески</h3>
                                                <p className="text-sm text-gray-500">Выполнено: 25.12.2023</p>
                                            </div>
                                            <Badge variant="secondary">Завершено</Badge>
                                        </div>
                                        <p className="text-sm">Замена передних амортизаторов, сайлентблоков передних
                                            рычагов</p>
                                        <p className="text-sm text-gray-500 mt-2">Механик: Сидоров И.И.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Техническое состояние */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Car className="w-5 h-5"/>
                                    Техническое состояние
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium mb-2">Текущие проблемы</h3>
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2 text-sm">
                                                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5"/>
                                                    <p>Посторонний шум при повороте руля на малой скорости</p>
                                                </div>
                                                <div className="flex items-start gap-2 text-sm">
                                                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5"/>
                                                    <p>Требуется замена тормозных колодок (износ 85%)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium mb-2">Рекомендации</h3>
                                            <div className="space-y-2 text-sm">
                                                <p>• Замена тормозной жидкости (последняя замена более 2 лет назад)</p>
                                                <p>• Балансировка колес при следующем ТО</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Планировщик */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5"/>
                                    Планировщик
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Bell className="w-4 h-4 text-blue-500"/>
                                            <h3 className="font-medium">Плановое ТО</h3>
                                        </div>
                                        <p className="text-sm">Запланировано на: 15.02.2024</p>
                                        <p className="text-sm text-gray-500 mt-1">Замена масла, фильтров, диагностика
                                            ходовой части</p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Bell className="w-4 h-4 text-yellow-500"/>
                                            <h3 className="font-medium">Замена тормозных колодок</h3>
                                        </div>
                                        <p className="text-sm">Рекомендуемый срок: до 01.03.2024</p>
                                        <p className="text-sm text-gray-500 mt-1">Требуется заказ запчастей</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/*<Tabs defaultValue="account" className="space-y-5">*/}
                    {/*    <TabsList className="grid grid-cols-4 w-[500px]">*/}
                    {/*        <TabsTrigger value="account">Профиль</TabsTrigger>*/}
                    {/*        <TabsTrigger value="password">Заказы</TabsTrigger>*/}
                    {/*        <TabsTrigger value="password2">Автомобили</TabsTrigger>*/}
                    {/*        <TabsTrigger value="password3">Настройки</TabsTrigger>*/}
                    {/*    </TabsList>*/}
                    {/*    <TabsContent value="account">*/}
                    {/*        <Card className={'w-96'}>*/}
                    {/*            <CardHeader>*/}
                    {/*                <CardTitle>Профиль</CardTitle>*/}
                    {/*                <CardDescription>*/}
                    {/*                    Make changes to your account here. Click save when you're done.*/}
                    {/*                </CardDescription>*/}
                    {/*            </CardHeader>*/}
                    {/*            <CardContent className="space-y-2 ">*/}
                    {/*                <ClientFormContainer/>*/}
                    {/*            </CardContent>*/}
                    {/*        </Card>*/}
                    {/*    </TabsContent>*/}
                    {/*    <TabsContent value="password">*/}
                    {/*        <Card>*/}
                    {/*            <CardHeader>*/}
                    {/*                <CardTitle>Заказы</CardTitle>*/}
                    {/*                <CardDescription>*/}
                    {/*                    Change your password here. After saving, you'll be logged out.*/}
                    {/*                </CardDescription>*/}
                    {/*            </CardHeader>*/}
                    {/*            <CardContent className="space-y-2">*/}
                    {/*            </CardContent>*/}
                    {/*            <CardFooter>*/}
                    {/*                <Button>Save password</Button>*/}
                    {/*            </CardFooter>*/}
                    {/*        </Card>*/}
                    {/*    </TabsContent>*/}
                    {/*    <TabsContent value="password2">*/}
                    {/*        <Card className={'w-96'}>*/}
                    {/*            <CardHeader>*/}
                    {/*                <CardTitle>Автомобили</CardTitle>*/}
                    {/*                <CardDescription>*/}
                    {/*                    Make changes to your account here. Click save when you're done.*/}
                    {/*                </CardDescription>*/}
                    {/*            </CardHeader>*/}
                    {/*            <CardContent className="space-y-2 ">*/}
                    {/*                /!*<ClientFormContainer/>*!/*/}
                    {/*            </CardContent>*/}
                    {/*        </Card>*/}
                    {/*    </TabsContent>*/}
                    {/*</Tabs>*/}
                </div>
            </section>

        </>
    );
};
export default Page;

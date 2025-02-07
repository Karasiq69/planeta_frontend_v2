'use client'
import {useVehicleById} from "@/features/cars/api/queries";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertCircle, Bell, Calendar, Car} from "lucide-react";
import React from "react";
import VehicleDetails from "@/features/cars/components/VehicleDetails";
import CarOwnerCard from "@/features/cars/components/CarOwnerCard";
import CarServiceHistory from "@/features/cars/components/CarServiceHistory";

type Props = {
    carId: string
};

const CarContentWrapper = ({carId}: Props) => {
    const {data, isLoading} = useVehicleById(+carId)
    const onEdit = () => {
    }

    if (isLoading) return 'loading'
    if (!data) return 'no data'

    return (<section className="space-y-4">
        <VehicleDetails car={data}/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Column 1 - 2/3 width */}
            <div className="space-y-4 lg:col-span-2">
                {data?.owner && <CarOwnerCard owner={data.owner} onEdit={onEdit}/>}

                {/* История обслуживания */}
                <CarServiceHistory/>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
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
                                    <h4 className="font-medium mb-2">Текущие проблемы</h4>
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
                                    <h4 className="font-medium mb-2">Рекомендации</h4>
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
                                    <h4 className="font-medium">Плановое ТО</h4>
                                </div>
                                <p className="text-sm">Запланировано на: 15.02.2024</p>
                                <p className="text-sm text-gray-500 mt-1">Замена масла, фильтров, диагностика
                                    ходовой части</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bell className="w-4 h-4 text-yellow-500"/>
                                    <h4 className="font-medium">Замена тормозных колодок</h4>
                                </div>
                                <p className="text-sm">Рекомендуемый срок: до 01.03.2024</p>
                                <p className="text-sm text-gray-500 mt-1">Требуется заказ запчастей</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>);
};

export default CarContentWrapper;
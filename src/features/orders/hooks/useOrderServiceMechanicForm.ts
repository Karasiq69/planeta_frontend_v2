import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {OrderServiceMechanic} from "../types";
import {OrderServiceMechanicFormData, orderServiceMechanicSchema} from "../components/forms/service-mechanic/schema";
import {useUpdateMechanicOrderService} from "@/features/orders/api/mutations";
// import { useCreateOrderServiceMechanic, useUpdateOrderServiceMechanic } from "../api/mutations";

type Props = {
    orderServiceId: number;
    mechanicData?: OrderServiceMechanic;
    onUpdate?: (mechanicId: number) => OrderServiceMechanic;
    onCreate?: (data: OrderServiceMechanic) => void;
};

export const useOrderServiceMechanicForm = ({orderServiceId, mechanicData, onUpdate, onCreate}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    // const createServiceMechanic = useCreateOrderServiceMechanic();
    const updateServiceMechanic = useUpdateMechanicOrderService();

    const form = useForm<OrderServiceMechanicFormData>({
        resolver: zodResolver(orderServiceMechanicSchema),
        defaultValues: {
            mechanicId: mechanicData?.mechanicId || 0,
            participationPercentage: mechanicData?.participationPercentage || 100,
            paymentType: mechanicData?.paymentType || 'percent',
            paymentRate: mechanicData?.paymentRate || 0,
        },
    });

    const onSubmit = async (data: OrderServiceMechanicFormData) => {
        if (!mechanicData?.id) return;
        const {mechanicId, ...restData} = data;

        updateServiceMechanic.mutateAsync({
            mechanicId: mechanicData.id,
            orderServiceId: orderServiceId,
            data: {
                ...restData
            }
        });
        onUpdate?.(mechanicData.id);
    };

    return {form, onSubmit, isLoading};
}; 
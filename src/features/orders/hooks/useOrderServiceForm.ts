import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {OrderService} from "../types";
import {OrderServiceFormData, orderServiceSchema} from "../components/forms/order-service/schema";
import {useUpdateOrderService} from "@/features/orders/api/mutations";

type Props = {
    orderServiceData?: OrderService;
    orderId: number;
    onUpdate?: (orderServiceId: number) => void;
    onCreate?: (data: OrderService) => void;
};

export const useOrderServiceForm = ({orderServiceData, orderId, onUpdate, onCreate}: Props) => {

    const {mutate: updateOrderService, isPending: isUpdatePending} = useUpdateOrderService(orderId)

    const form = useForm<OrderServiceFormData>({
        resolver: zodResolver(orderServiceSchema),
        defaultValues: {
            defaultDuration: orderServiceData?.defaultDuration || 60,
            appliedRate: orderServiceData?.appliedRate || 0,
            appliedPrice: orderServiceData?.appliedPrice || 0,
            discountPercent: orderServiceData?.discountPercent || 0,
        },
    });

    const onSubmit = async (data: OrderServiceFormData) => {

        if (orderServiceData?.id) {
            console.log('data')
            updateOrderService({
                data: data,
                orderServiceId: orderServiceData.id
            })
            // await updateOrderService.mutateAsync({ id: orderServiceData.id, ...serviceData });
            onUpdate?.(orderServiceData.id);
        } else {
            console.log('no data')
            // const newOrderService = await createOrderService.mutateAsync(serviceData);
            // onCreate?.(newOrderService);
        }
    };

    const isLoading = isUpdatePending

    return {form, onSubmit, isLoading};
};
'use client'

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {OrderProduct} from "../types";
import {OrderProductFormData, orderProductSchema} from "../components/forms/schema";
import {useUpdateOrderProduct} from "@/features/order-products/api/mutations";
import {useParams} from "next/navigation";


type Props = {
    orderProductData?: OrderProduct;
    onUpdate?: (orderProductId: number) => void;
    onCreate?: (data: OrderProduct) => void;
};

export const useOrderProductForm = ({orderProductData, onUpdate, onCreate}: Props) => {
    const {id} = useParams()
    const orderId = Number(id)
    const {
        mutate: updateOrderProduct,
        isPending: isUpdatePending
    } = useUpdateOrderProduct(orderProductData?.id || orderId);

    const form = useForm<OrderProductFormData>({
        resolver: zodResolver(orderProductSchema),
        defaultValues: {
            name: orderProductData?.product.name,
            productId: orderProductData?.productId || 0,
            quantity: orderProductData?.quantity,
            price: orderProductData?.actualPrice || "0.00",
        },
    });

    const onSubmit = (data: OrderProductFormData) => {
        if (orderProductData) {
            updateOrderProduct({
                productId: orderProductData.id,
                data: {
                    quantity: data.quantity.toString(),
                    actualPrice: data.price
                }
            })
            onUpdate?.(orderProductData.id);
        } else {
            console.log('Creating order product:', data);
            // createOrderProduct(data, {
            //     onSuccess: (data) => onCreate && onCreate(data),
            // });
        }
    };

    return {form, onSubmit, isLoading: isUpdatePending};
}; 
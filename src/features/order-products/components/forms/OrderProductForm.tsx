'use client'

import {OrderProduct} from "../../types";
import {useOrderProductForm} from "../../hooks/useOrderProductForm";
import {OrderProductFormFields} from "./order-product-form-fields";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import LoaderAnimated from "@/components/ui/LoaderAnimated";

interface Props {
    orderProductData?: OrderProduct;
    onUpdate?: (orderProductId: number) => void;
    onCreate?: (data: OrderProduct) => void;
}

export const OrderProductForm = ({ orderProductData, onUpdate, onCreate }: Props) => {
    const { form, onSubmit, isLoading } = useOrderProductForm({
        orderProductData,
        onUpdate,
        onCreate,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <OrderProductFormFields form={form} />
                <Button disabled={isLoading} variant="default" className="w-full" type="submit">
                    {orderProductData ? 'Обновить' : 'Добавить продукт'}
                    {isLoading && <LoaderAnimated className="text-white" />}
                </Button>
            </form>
        </Form>
    );
}; 
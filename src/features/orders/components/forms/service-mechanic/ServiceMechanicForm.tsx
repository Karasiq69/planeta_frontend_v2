'use client'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {OrderServiceMechanic} from "@/features/orders/types";
import {useOrderServiceMechanicForm} from "@/features/orders/hooks/useOrderServiceMechanicForm";
import ServiceMechanicFormFields
    from "@/features/orders/components/forms/service-mechanic/service-mechanic-form-fields";
import LoaderAnimated from "@/components/ui/LoaderAnimated";

type Props = {
    orderServiceId: number;
    mechanicData?: OrderServiceMechanic;
    onCreate?: (data: OrderServiceMechanic) => void;
    onUpdate?: (mechanicId: number) => OrderServiceMechanic;
};

const ServiceMechanicForm = ({orderServiceId, mechanicData, onCreate, onUpdate}: Props) => {
    const {form, onSubmit, isLoading} = useOrderServiceMechanicForm({
        orderServiceId,
        mechanicData, 
        onUpdate, 
        onCreate
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <pre className={'text-xs text-muted-foreground'}>{JSON.stringify(mechanicData, null, 2)}</pre>
                <ServiceMechanicFormFields form={form}/>
                <Button disabled={isLoading} variant={'default'} className={'w-full'} type="submit">
                    {mechanicData ? 'Обновить' : 'Добавить механика'} 
                    {isLoading && <LoaderAnimated className={'text-white'}/>}
                </Button>
            </form>
        </Form>
    );
};

export default ServiceMechanicForm; 
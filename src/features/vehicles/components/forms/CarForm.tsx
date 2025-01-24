'use client'
import {Button} from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {ICar} from "@/features/vehicles/types";
import {useCarForm} from "@/features/vehicles/hooks/useCarForm";
import CarFormFields from "@/features/vehicles/components/forms/car-form-fields";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

type Props = {
    carId?: number
    carData?: ICar | undefined
};
const CarForm = ({carId, carData}: Props) => {
    const {form, onSubmit, isLoading} = useCarForm({carData})

    return (
        <div>

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <CarFormFields form={form}/>
                    <Button disabled={isLoading} variant={'default'} className={'w-full'} type="submit">
                        {carId ? 'Обновить' : 'Создать'} {isLoading && <LoaderAnimated className={'text-white'}/>}
                    </Button>
                </form>
            </Form>

        </div>
    );
};
export default CarForm;

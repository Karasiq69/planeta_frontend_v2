'use client'
import {Button} from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {ICar} from "@/features/cars/types";
import {useCarForm} from "@/features/cars/hooks/useCarForm";
import CarFormFields from "@/features/cars/components/forms/car-form-fields";

type Props = {
    carId?: number
    carData?: ICar | undefined
    onCreate?: (data: ICar) => void; // дополнительная функция при создании
    onUpdate?: (carId: number) => ICar; // доп функция при обновлении
};
const CarForm = ({carId, carData, onUpdate, onCreate}: Props) => {
    const {form, onSubmit, isLoading} = useCarForm({carData, onUpdate, onCreate})

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

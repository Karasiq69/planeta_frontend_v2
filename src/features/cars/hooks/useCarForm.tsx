import {ICar} from "@/features/cars/types";
import {useCreateCar, useEditCar} from "@/features/cars/api/mutations";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMemo} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {carFormSchema} from "@/features/cars/components/forms/schema";
import {toast} from "sonner";

export type CarFormProps = {
    carData?: ICar
}

export const useCarForm = ({carData}: CarFormProps) => {
    const {mutate: createCar, isPending: isCreating} = useCreateCar();
    const {mutate: updateCar, isPending: isUpdating} = useEditCar(carData?.id as number);


    const defaultValues = useMemo(() => ({
        brandId: carData?.brand.id || 16,
        modelId: carData?.model.id as unknown as number,
        year: carData?.year,
        vin: carData?.vin || '',
        licencePlate: carData?.licensePlate || '',
        // current_mileage: carData?.mileages[0]?.value.toString() || '',
        // custom_brand: '',
    }), [carData]);

    const form = useForm<z.infer<typeof carFormSchema>>({
        resolver: zodResolver(carFormSchema),
        values: defaultValues,
        mode: "onSubmit"
    });

    const onSubmit = (data: z.infer<typeof carFormSchema>) => {


        if (carData) {
            const updateData = {
                ...data,
                carId: carData.id,
            };
            updateCar(updateData, {
                onSuccess: () => toast.success("Автомобиль успешно обновлен"),
                onError: (error) => {
                    console.error("Ошибка при обновлении автомобиля:", error);
                    toast.error("Ошибка при обновлении автомобиля");
                }
            });
            toast.info(<pre>{JSON.stringify(data, null, 2)}</pre>)

        } else {
            createCar(data, {
                onSuccess: () => toast.success("Автомобиль успешно создан"),
                onError: (error) => {
                    console.error("Ошибка при создании автомобиля:", error);
                    toast.error("Ошибка при создании автомобиля");
                }
            });
            toast.info(<pre>{JSON.stringify(data, null, 2)}</pre>)

        }

    };

    const isLoading = isCreating || isUpdating

    return {form, onSubmit, isLoading, isUpdating, isCreating};
}